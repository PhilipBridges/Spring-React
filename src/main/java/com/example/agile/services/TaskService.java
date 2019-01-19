package com.example.agile.services;

import com.example.agile.Impl.UserDetailsServiceImpl;
import com.example.agile.domain.Task;
import com.example.agile.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Service
public class TaskService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    public Task saveOrUpdateTask(Task task) {

        if (task.getStatus() == null || task.getStatus() == "") {
            task.setStatus("TO_DO");
        }

        return taskRepository.save(task);
    }

    public Iterable<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task findById(Long id) {
        return taskRepository.getById(id);
    }

    public void delete(Long id) {
        Task deleteTask = findById(id);
        taskRepository.delete(deleteTask);
    }

    public List<Task> findByOwner(String username) {
        System.out.println("LMAO" + username);
        String queryString = "SELECT t FROM Task t WHERE t.owner = :username";
        Query query = entityManager.createQuery(queryString);
        query.setParameter("username", username);
        List<Task> taskList = (List<Task>) query.getResultList();
        return taskList;
    }
}
