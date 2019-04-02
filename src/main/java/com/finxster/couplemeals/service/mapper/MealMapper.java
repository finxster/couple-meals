package com.finxster.couplemeals.service.mapper;

import com.finxster.couplemeals.domain.*;
import com.finxster.couplemeals.service.dto.MealDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Meal and its DTO MealDTO.
 */
@Mapper(componentModel = "spring", uses = {RecipeMapper.class})
public interface MealMapper extends EntityMapper<MealDTO, Meal> {

    @Mapping(source = "recipe.id", target = "recipeId")
    MealDTO toDto(Meal meal);

    @Mapping(source = "recipeId", target = "recipe")
    Meal toEntity(MealDTO mealDTO);

    default Meal fromId(Long id) {
        if (id == null) {
            return null;
        }
        Meal meal = new Meal();
        meal.setId(id);
        return meal;
    }
}
