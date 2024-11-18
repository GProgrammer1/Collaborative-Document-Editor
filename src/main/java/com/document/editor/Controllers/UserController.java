package com.document.editor.Controllers;

import com.document.editor.Entities.User;
import com.document.editor.Models.Response;
import com.document.editor.Services.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@Controller
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserServiceImpl userService;

    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .statusCode(HttpStatus.OK.value())
                        .message("User Successfully Retrieved")
                        .data(Map.of("user", userService.getUser(id) ))
                        .build()
        ) ;
    }

    @GetMapping("/list")
    public ResponseEntity<Response> getUsers() {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .statusCode(HttpStatus.OK.value())
                        .message("User Successfully Retrieved")
                        .data(Map.of("users", userService.getUsers() ))
                        .build()
        ) ;
    }

    @PostMapping("/save")
    public ResponseEntity<Response> saveUser(@Valid @RequestBody User user) {

        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .statusCode(HttpStatus.CREATED.value())
                        .message("User Successfully Created")
                        .data(Map.of("user", userService.saveUser(user) ))
                        .build()
        ) ;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteUser(@PathVariable Long id) {
        User toBeDeleted = userService.getUser(id);
        userService.deleteUser(id);
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .statusCode(HttpStatus.NO_CONTENT.value())
                        .message("User Successfully Deleted")
                        .data(Map.of("user",toBeDeleted))
                        .build()
        ) ;
    }
}
