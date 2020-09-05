<?php
 defined('BASEPATH') OR exit('No direct script access allowed');
class User_model extends CI_Model{
	public function checkLogin($username,$password){
        $this->db->select('userId,firstName,lastName,emailId,gender,age,region,roleId');
        $data = $this->db->get_where("users", ['emailId' => $username,'password'=>md5($password)])->row_array();
        return $data;
    }
}
