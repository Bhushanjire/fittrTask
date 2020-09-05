<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';
class User extends REST_Controller {

    function __construct($config = 'rest')
    {
        parent::__construct($config);
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }
        $this->load->model('user_model');
    }

    //login
    public function login_post()
    {
        $username = $this->post('emailId');
        $password = $this->post('password');

$responce = $this->user_model->checkLogin($username,$password);

if(!empty($responce)){
  $this->set_response([
                'statusCode' =>200,
                'isSuccess' => true,
                'data' =>$responce,
                'message' => 'Login successfully'
            ], REST_Controller::HTTP_OK);
}else{
      $this->set_response([
                'statusCode' =>200,
                'isSuccess' => false,
                'data' =>'',
                'message' => 'Invalid username or password'
            ], REST_Controller::HTTP_OK);
}

           
        
    }

}