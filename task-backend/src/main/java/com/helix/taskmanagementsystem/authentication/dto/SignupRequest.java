package com.helix.taskmanagementsystem.authentication.dto;

import lombok.Data;

@Data
public class SignupRequest {

    private String name;
    private String email;
    private String password;

}
