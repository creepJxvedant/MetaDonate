package com.metadonate.database.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.metadonate.database.dto.OneDonationRequestDTO;
import com.metadonate.database.dto.DonationRequestDTO;
import com.metadonate.database.model.DonationRequest;
import com.metadonate.database.model.User;
import com.metadonate.database.repository.DonationRequestRepository;
import com.metadonate.database.repository.UserRepository;

@Service
public class DonationService {

    private final DonationRequestRepository donationRequestRepository;
    private final UserRepository userRepository;

    public DonationService(DonationRequestRepository donationRequestRepository, UserRepository userRepository) {
        this.donationRequestRepository = donationRequestRepository;
        this.userRepository = userRepository;
    }

    public List<DonationRequestDTO> getDonationRequests(int page, int size) {
        Pageable pageable = PageRequest.of(page, size); // Create Pageable object for pagination
        Page<DonationRequest> pageResult = donationRequestRepository.findAll(pageable);

        return pageResult.stream()
                .map(DonationRequestDTO::new) // Convert DonationRequest to DonationRequestDTO
                .toList();
    }

    public OneDonationRequestDTO getDonationRequestById(Long id) {
        DonationRequest donationRequest = donationRequestRepository.findById(id).orElse(null);
        if (donationRequest == null) {
            return null;
        }
        return new OneDonationRequestDTO(donationRequest);
    }

    public List<DonationRequestDTO> getDonationRequestByUser(Long id) {
        List<DonationRequest> donationRequests = donationRequestRepository.findByUserId(id);
        return donationRequests.stream()
                .map(DonationRequestDTO::new)
                .collect(Collectors.toList());
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
    }

    public DonationRequestDTO createDonation(DonationRequestDTO donationRequestDTO) {
        // Find user by ID from DTO
        User user = findUserById(donationRequestDTO.user().user_id());

        // Map the DTO to entity
        DonationRequest donationRequest = new DonationRequest();
        donationRequest.setAmtRequest(donationRequestDTO.amountNeeded());
        donationRequest.setAmtReceived(donationRequestDTO.amountCollected());
        donationRequest.setTitle(donationRequestDTO.title());
        donationRequest.setMessage(donationRequestDTO.recipientAddress());
        donationRequest.setAddress(donationRequestDTO.recipientAddress());
        donationRequest.setFulfilled(donationRequestDTO.fulfilled());
        donationRequest.setUser(user); // Set user entity
        DonationRequest savedRequest = donationRequestRepository.save(donationRequest);
        return new DonationRequestDTO(savedRequest);
    }
}
