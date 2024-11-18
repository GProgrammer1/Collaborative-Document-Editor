package com.document.editor.Models;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
@Data
@SuperBuilder
public class Response {
    private LocalDateTime timestamp ;
    private String message ;
    private int statusCode ;
    private Map<?,?> data;
}
