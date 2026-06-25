package com.thestoryceller.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalDetails {

    @Column(name = "customer_name")
    private String name;

    @Column(name = "customer_age")
    private Integer age;

    @Column(name = "relationship")
    private String relationship;

    @Column(name = "about_person", length = 1000)
    private String aboutPerson;

    @Column(name = "special_message", length = 1000)
    private String specialMessage;
}
