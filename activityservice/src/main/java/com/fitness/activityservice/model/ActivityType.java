package com.fitness.activityservice.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ActivityType {
    RUNNING,
    WALKING,
    CYCLING,
    SWIMMING,
    YOGA,
    WEIGHT_TRAINING,
    STRETCHING,
    CARDIO

}
