package com.document.editor.Services;

import com.document.editor.Entities.Document;
import com.document.editor.Entities.User;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {
    User getUser(Long id);
    List<User> getUsers();
    User saveUser(User user);
    boolean deleteUser(Long id);
}
