package com.example.agile.repositories;

import com.example.agile.domain.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    Task getById(Long id);

    Set<Task> getByOwner(String username);
}
