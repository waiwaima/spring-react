package com.wwm.spreact.repository;

import com.wwm.spreact.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
