package com.document.editor.Controllers;

import com.document.editor.Entities.Document;
import com.document.editor.Models.Response;
import com.document.editor.Repositories.DocumentRepository;
import com.document.editor.Services.DocumentService;
import com.document.editor.Services.DocumentServiceImpl;
import jakarta.validation.Valid;
import org.hibernate.grammars.hql.HqlParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Map;

@Controller
@RequestMapping("/document")
@CrossOrigin(origins = "http://localhost:4200")
public class DocumentController {

    private final DocumentServiceImpl documentService;
    private final DocumentRepository documentRepository;

    public DocumentController(DocumentServiceImpl documentService, DocumentRepository documentRepository) {
        this.documentService = documentService;
        this.documentRepository = documentRepository;
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Response> getDocument(@PathVariable String filename) {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .statusCode(HttpStatus.OK.value())
                        .message("Document Successfully Retrieved")
                        .data(Map.of("document", documentService.getDocument(filename) ))
                        .build()
        ) ;
    }

    @GetMapping("/list")
    public ResponseEntity<Response> getDocuments() {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .statusCode(HttpStatus.OK.value())
                        .message("Document Successfully Retrieved")
                        .data(Map.of("documents", documentService.getDocuments() ))
                        .build()
        ) ;
    }

    @PostMapping("/save")
    public ResponseEntity<Response> updateDocument( @RequestParam("file") MultipartFile file) throws IOException {

        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .statusCode(HttpStatus.CREATED.value())
                        .message("Document Successfully Created")
                        .data(Map.of("document", documentService.saveDocument(file) ))
                        .build()
        ) ;
    }
    @DeleteMapping("/delete/{filename}")
        public ResponseEntity<Response> deleteDocument(@PathVariable String filename) {
        Document toBeDeleted = documentService.getDocument(documentRepository.findByFilename(filename).get().getFilename());
        documentService.deleteDocument(filename);
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(LocalDateTime.now())
                        .statusCode(HttpStatus.NO_CONTENT.value())
                        .message("Document Successfully Deleted")
                        .data(Map.of("document",toBeDeleted))
                        .build()
        ) ;
    }

    @GetMapping("/file/{filename}")
    public ResponseEntity<Response> getFile(@PathVariable String filename) throws IOException {
        Path path = Paths.get(Document.storagePath, filename) ;
        byte[] bytes = Files.readAllBytes(path);
        try {

            return ResponseEntity.ok(
                    Response
                            .builder()
                            .timestamp(LocalDateTime.now())
                            .statusCode(HttpStatus.OK.value())
                            .message("File successfully retrieved")
                            .data(Map.of("file", bytes))
                            .build()
            ) ;
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Response
                            .builder()
                            .timestamp(LocalDateTime.now())
                            .statusCode(HttpStatus.NOT_FOUND.value())
                            .message("No file found")
                            .data(Map.of("file", "no file"))
                            .build()
            );
        }

    }

}
