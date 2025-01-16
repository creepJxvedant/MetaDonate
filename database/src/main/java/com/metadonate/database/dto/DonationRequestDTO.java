package com.metadonate.database.dto;

import com.metadonate.database.model.DonationRequest;

public record DonationRequestDTO(
                Long id,
                UserDTO user,
                String title,
                boolean fulfilled,
                double amountNeeded,
                double amountCollected,
                String recipientAddress) {

        public DonationRequestDTO(DonationRequest donationRequest) {
                this(
                                donationRequest.getId(),
                                new UserDTO(donationRequest.getUser()),
                                donationRequest.getTitle(),
                                donationRequest.isFulfilled(),
                                donationRequest.getAmtRequest(),
                                donationRequest.getAmtReceived(),
                                donationRequest.getAddress());
        }
}
