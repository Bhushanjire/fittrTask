<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class PromoCode extends REST_Controller
{

    function __construct($config = 'rest')
    {
        parent::__construct($config);
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS")
        {
            die();
        }
        $this
            ->load
            ->model('promoCode_model');
    }

    //function for create the promocode
    public function createPromoCode_post()
    {

        $age = $this->post('age');
        $gender = $this->post('gender');
        $region = $this->post('region');
        $startDate = $this->post('startDate');
        $endDate = $this->post('endDate');
        $discount = $this->post('discount');

        $postData = array(
            'codeName' => $this->generatePromoCode($age, $gender, $region) ,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'discount' => $discount,
            'age' => $age,
            'gender' => $gender,
            'region' => $region
        );

        $responce = $this
            ->promoCode_model
            ->createPromoCode($postData);

        if (!empty($responce))
        {
            $this->set_response(['statusCode' => 200, 'isSuccess' => true, 'data' => $responce, 'message' => 'Promocode created successfully'], REST_Controller::HTTP_OK);
        }
        else
        {
            $this->set_response(['statusCode' => 200, 'isSuccess' => false, 'data' => '', 'message' => 'Error while creating promocode'], REST_Controller::HTTP_OK);
        }

    }

    //function for generate the promocode according age,gender and region criteria
    public function generatePromoCode($age, $gender, $region)
    {
        return strtoupper(str_shuffle($region . $age . $gender));
    }

    //function for get all promocode list for admin
    public function getAllPromocode_get()
    {
        $responce = $this
            ->promoCode_model
            ->getAllPromocode();
        if (!empty($responce))
        {
            $this->set_response(['statusCode' => 200, 'success' => true, 'data' => $responce, 'message' => 'All promocode list'], REST_Controller::HTTP_OK);
        }
        else
        {
            $this->set_response(['statusCode' => 200,

            'isSuccess' => false, 'data' => '', 'message' => 'Error while getting promocode list'], REST_Controller::HTTP_OK);
        }
    }

    //function for get active and started promocode list for customer
    public function getActivePromocode_get()
    {
        $responce = $this
            ->promoCode_model
            ->getActivePromocode();
        if (!empty($responce))
        {
            $this->set_response(['statusCode' => 200, 'success' => true, 'data' => $responce, 'message' => 'Active promocode list'], REST_Controller::HTTP_OK);
        }
        else
        {
            $this->set_response(['statusCode' => 200,

            'isSuccess' => false, 'data' => '', 'message' => 'Error while getting active promocode list'], REST_Controller::HTTP_OK);
        }
    }

    //Function for active/inactive promocode
    public function updateStatus_put()
    {
        $codeId = $this->put('codeId');
        $status = $this->put('status');
        $responce = $this
            ->promoCode_model
            ->updateStatus($codeId, $status);

        if (!empty($responce))
        {
            $this->set_response(['statusCode' => 200, 'isSuccess' => true, 'data' => $responce, 'message' => 'Promocode status updated'], REST_Controller::HTTP_OK);
        }
        else
        {
            $this->set_response(['statusCode' => 200, 'isSuccess' => false, 'data' => '', 'message' => 'Error while updating promocode '], REST_Controller::HTTP_OK);
        }

    }

    //function for apply the promocode
    public function applyPromoCode_post()
    {
        $userId = $this->post('userId');
        $codeId = $this->post('promoCodeId');
        $age = $this->post('age');
        $gender = $this->post('gender');
        $region = $this->post('region');

        //check the customer is applicable or not for this promocode
        $isValid = $this->checkIsApplicable($age, $gender, $region, $codeId);

        if (!empty($isValid))
        {
            //check promocode is expired or not
            $isCodeExpired = $this->checkCodeIsExpired($codeId);

            if ($isCodeExpired < 1)
            {
                //check the customer is use or not this promocode
                $responce = $this
                    ->promoCode_model
                    ->checkApplied($codeId, $userId);
                if (empty($responce))
                {
                    $postData = array(
                        "userId" => $userId,
                        "promoCodeId" => $codeId
                    );
                    $responceCode = $this
                        ->promoCode_model
                        ->applyPromoCode($postData);
                    if (!empty($responceCode))
                    {
                        $this->set_response(['statusCode' => 200, 'isSuccess' => true, 'data' => $responce, 'message' => 'Promocode applied successfully'], REST_Controller::HTTP_OK);
                    }
                    else
                    {
                        $this->set_response(['statusCode' => 200, 'isSuccess' => false, 'data' => '', 'message' => 'Error while applying promocode'], REST_Controller::HTTP_OK);
                    }
                }
                else
                {
                    $this->set_response(['statusCode' => 200, 'isSuccess' => false, 'data' => '', 'message' => 'You already use this promocode'], REST_Controller::HTTP_OK);
                }

            }
            else
            {
                $this->set_response(['statusCode' => 200, 'isSuccess' => false, 'data' => '', 'message' => 'This promocode is expired'], REST_Controller::HTTP_OK);
            }

        }
        else
        {
            $this->set_response(['statusCode' => 200, 'isSuccess' => false, 'data' => '', 'message' => 'You are not applicable for this promocode'], REST_Controller::HTTP_OK);
        }

    }

    //function for checke the customer is applicable for promocode or not
    public function checkIsApplicable($age, $gender, $region, $codeId)
    {
        return $this
            ->promoCode_model
            ->checkIsApplicable($age, $gender, $region, $codeId);
    }

    //function check the promocode is expire or not
    public function checkCodeIsExpired($codeId)
    {
        return $this
            ->promoCode_model
            ->checkCodeIsExpired($codeId);

    }
}

