package com.wwm.spreact.controller;

import com.wwm.spreact.model.Post;
import com.wwm.spreact.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PostController {

  @Autowired
  private PostRepository repository;

  @GetMapping("/posts")
  public ResponseEntity<?> list() {
    List<Post> posts =repository.findAll();
    return ResponseEntity.ok().body(posts);
  }

  @GetMapping("/posts/{id}")
  public ResponseEntity<?> get(@PathVariable Long id) {
    Optional<Post> post = repository.findById(id);
    return post.map(response -> ResponseEntity.ok().body(response))
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/posts")
  public ResponseEntity<Post> create(@Valid @RequestBody Post post) throws URISyntaxException {
    Post result = repository.save(post);
    return ResponseEntity.created(new URI("/api/posts/" + result.getId()))
        .body(result);
  }

  @PutMapping("/posts/{id}")
  public ResponseEntity<Post> update(@PathVariable Long id, @Valid @RequestBody Post post) {
    Post result = repository.save(post);
    return ResponseEntity.ok().body(result);
  }

  @DeleteMapping("/posts/{id}")
  public ResponseEntity<?> delete(@PathVariable Long id) {
    repository.deleteById(id);
    return ResponseEntity.ok().build();
  }
}
