package com.wwm.spreact;

import com.wwm.spreact.model.Post;
import com.wwm.spreact.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class Initializer implements CommandLineRunner {

  @Autowired
  private PostRepository repository;

  @Override
  public void run(String... strings) {
    Post post = Post.builder()
        .title("qui est esse")
        .tag("qui")
        .body("est rerum tempore vitae\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\nqui aperiam non debitis possimus qui neque nisi nulla")
        .build();
    repository.save(post);

    post = Post.builder()
        .title("nesciunt quas odio")
        .tag("nesciunt")
        .body("repudiandae veniam quaerat sunt sed\\nalias aut fugiat sit autem sed est\\nvoluptatem omnis possimus esse voluptatibus quis\\nest aut tenetur dolor neque")
        .build();
    repository.save(post);

    post = Post.builder()
        .title("magnam facilis autem")
        .tag("magnam")
        .body("dolore placeat quibusdam ea quo vitae\\nmagni quis enim qui quis quo nemo aut saepe\\nquidem repellat excepturi ut quia\\nsunt ut sequi eos ea sed quas")
        .build();
    repository.save(post);

    repository.findAll().forEach(System.out::println);
  }
}
