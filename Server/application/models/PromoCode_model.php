<?php
defined('BASEPATH') or exit('No direct script access allowed');
class PromoCode_model extends CI_Model
{
    public function createPromoCode($data)
    {
        return $this
            ->db
            ->insert('promocode', $data);
    }

    public function getAllPromocode()
    {
        $query = $this
            ->db
            ->get('promocode');
        return $row = $query->result_array();
    }

    public function getActivePromocode()
    {
        $this
            ->db
            ->select("* FROM promocode WHERE startDate <= CURRENT_DATE and status ='Active'", false);
        $query = $this
            ->db
            ->get();
        return $query->result_array();
    }

    public function updateStatus($codeId, $status)
    {
        $this
            ->db
            ->set('status', $status);
        $this
            ->db
            ->where('codeId', $codeId);
        return $this
            ->db
            ->update('promocode');

    }

    public function checkApplied($codeId, $userId)
    {
        $this
            ->db
            ->select('*');
        $data = $this
            ->db
            ->get_where("appliedPromCode", ['userId' => $userId, 'promoCodeId' => $codeId])->row_array();
        return $data;
    }

    public function applyPromoCode($data)
    {
        return $this
            ->db
            ->insert('appliedPromCode', $data);
    }

    public function checkIsApplicable($age, $gender, $region, $codeId)
    {
        $this
            ->db
            ->select('*');
        $data = $this
            ->db
            ->get_where("promocode", ['age' => $age, 'gender' => $gender, 'region' => $region, 'codeId' => $codeId])->row_array();
        return $data;
    }

    public function checkCodeIsExpired($codeId)
    {
        $this
            ->db
            ->select("codeId FROM promocode WHERE CURRENT_DATE > endDate and codeId =$codeId", false);
        $query = $this
            ->db
            ->get();
        return $query->num_rows();
    }
}

