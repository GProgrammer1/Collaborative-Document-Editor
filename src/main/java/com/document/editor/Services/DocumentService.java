package com.document.editor.Services;

import com.document.editor.Entities.Document;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;


public interface DocumentService {
    Document getDocument(String filename);
    List<Document> getDocuments();
    Document saveDocument(MultipartFile file) throws IOException;
    boolean deleteDocument(String filename);

}
