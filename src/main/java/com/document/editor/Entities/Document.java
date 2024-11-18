package com.document.editor.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@RequiredArgsConstructor
@SuperBuilder
public class Document {
    public  static final String storagePath = "C:\\Users\\AUB\\Documents" ;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    @Column(unique = true, nullable = false)
    private String filename ;
    private String directory ;
}
