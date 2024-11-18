package com.document.editor.Services;

import com.document.editor.Entities.Document;
import com.document.editor.Repositories.DocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;

    public DocumentServiceImpl(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }
    @Override
    public Document getDocument(String filename) {
        return documentRepository.findByFilename(filename).orElse(null);
    }

    @Override
    public List<Document> getDocuments() {
        return documentRepository.findAll() ;
    }

    @Override
    public Document saveDocument( MultipartFile file) throws IOException {
        String directory = Document.storagePath ;

        String filename = file.getOriginalFilename();

        Path path = Paths.get(directory, filename);
        System.out.println(path);
        if (Files.exists(path) && Files.isRegularFile(path)) {
            return updateDocument(file) ;
        }

          return  addDocument(file) ;

    }

    public File getFile(String filename) {
        Path path = Paths.get(Document.storagePath, filename);

        if (Files.exists(path) && Files.isRegularFile(path)) {
            return path.toFile();
        }
        return null;
    }

    public Document updateDocument(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        System.out.println("a");
        byte[] bytes = file.getBytes();

        // Define the directory where the file will be saved
        String directory = Document.storagePath; // Assuming this is a static field in Document class
        Path destinationPath = Paths.get(directory, filename);
        System.out.println(destinationPath);

        try {
            // Ensure the directory exists or create it

            Files.write(destinationPath, bytes);

        } catch (IOException e) {
            // Handle the exception (you can log it or rethrow it, depending on your use case)
            e.printStackTrace();
            throw new IOException("Error saving file: " + e.getMessage());
        }

        Document document = documentRepository.findByFilename(filename).orElseThrow(()-> new FileNotFoundException(filename));
        return documentRepository.save(document);
    }
    public Document addDocument(MultipartFile file) throws IOException {
        String directory = Document.storagePath ;


        String filename = file.getOriginalFilename();
        Path path = Paths.get(directory, filename);
        System.out.println(file.getOriginalFilename());

        try {

            Files.write(path, file.getBytes());
            Document document = new Document();
            document.setFilename(filename);
            document.setDirectory(Document.storagePath + "\\" + filename);
            return documentRepository.save(document);
        }
        catch (IOException e) {
            throw new IOException("Error saving file: " + e.getMessage());
        }
    }



    @Override
    public boolean deleteDocument(String filename) {
        try {
            documentRepository.deleteByFilename(filename);
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
