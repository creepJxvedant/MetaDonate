package com.metadonate.database.dto;

import com.metadonate.database.model.DonationRequest;
import com.metadonate.database.model.Doners;
import java.util.List;

public record OneDonationRequestDTO(
        Long id,
        UserDTO user,
        String title,
        boolean fulfilled,
        double amountNeeded,
        double amountCollected,
        String recipientAddress,
        String message,
        List<Doners> doners) {

    public OneDonationRequestDTO(DonationRequest donationRequest) {
        this(
                donationRequest.getId(),
                new UserDTO(donationRequest.getUser()),
                donationRequest.getTitle(),
                donationRequest.isFulfilled(),
                donationRequest.getAmtRequest(),
                donationRequest.getAmtReceived(),
                donationRequest.getAddress(),
                donationRequest.getMessage(),
                null);
    }
}