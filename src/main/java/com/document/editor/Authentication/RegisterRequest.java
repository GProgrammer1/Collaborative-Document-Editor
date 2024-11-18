package com.document.editor.Authentication;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

@Data
@RequiredArgsConstructor
public class RegisterRequest {
    private String firstname ;
    private String lastname ;
    private String email ;
    private String password ;
}
