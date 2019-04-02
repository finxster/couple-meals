package com.finxster.couplemeals.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Recipe.
 */
@Entity
@Table(name = "recipe")
public class Recipe implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    
    @Lob
    @Column(name = "step_by_step", nullable = false)
    private String stepByStep;

    
    @Lob
    @Column(name = "ingredients", nullable = false)
    private String ingredients;

    @OneToMany(mappedBy = "recipe")
    private Set<Meal> meals = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Recipe title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStepByStep() {
        return stepByStep;
    }

    public Recipe stepByStep(String stepByStep) {
        this.stepByStep = stepByStep;
        return this;
    }

    public void setStepByStep(String stepByStep) {
        this.stepByStep = stepByStep;
    }

    public String getIngredients() {
        return ingredients;
    }

    public Recipe ingredients(String ingredients) {
        this.ingredients = ingredients;
        return this;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public Set<Meal> getMeals() {
        return meals;
    }

    public Recipe meals(Set<Meal> meals) {
        this.meals = meals;
        return this;
    }

    public Recipe addMeal(Meal meal) {
        this.meals.add(meal);
        meal.setRecipe(this);
        return this;
    }

    public Recipe removeMeal(Meal meal) {
        this.meals.remove(meal);
        meal.setRecipe(null);
        return this;
    }

    public void setMeals(Set<Meal> meals) {
        this.meals = meals;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Recipe recipe = (Recipe) o;
        if (recipe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Recipe{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", stepByStep='" + getStepByStep() + "'" +
            ", ingredients='" + getIngredients() + "'" +
            "}";
    }
}
