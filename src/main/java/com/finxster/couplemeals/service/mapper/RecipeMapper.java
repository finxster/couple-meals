package com.finxster.couplemeals.service.mapper;

import com.finxster.couplemeals.domain.*;
import com.finxster.couplemeals.service.dto.RecipeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Recipe and its DTO RecipeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RecipeMapper extends EntityMapper<RecipeDTO, Recipe> {


    @Mapping(target = "meals", ignore = true)
    Recipe toEntity(RecipeDTO recipeDTO);

    default Recipe fromId(Long id) {
        if (id == null) {
            return null;
        }
        Recipe recipe = new Recipe();
        recipe.setId(id);
        return recipe;
    }
}
