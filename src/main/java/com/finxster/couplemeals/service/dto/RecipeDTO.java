package com.finxster.couplemeals.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Recipe entity.
 */
public class RecipeDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    
    @Lob
    private String stepByStep;

    
    @Lob
    private String ingredients;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStepByStep() {
        return stepByStep;
    }

    public void setStepByStep(String stepByStep) {
        this.stepByStep = stepByStep;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RecipeDTO recipeDTO = (RecipeDTO) o;
        if (recipeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recipeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RecipeDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", stepByStep='" + getStepByStep() + "'" +
            ", ingredients='" + getIngredients() + "'" +
            "}";
    }
}
