package com.grupob.pubsubsubscriber.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.grupob.pubsubsubscriber.model.ReservationData;
import com.grupob.pubsubsubscriber.repository.ReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ReservationService {
    private static final Logger logger = LoggerFactory.getLogger(ReservationService.class);
    private final ObjectMapper objectMapper;
    private final ReservationRepository repository;
    
    public ReservationService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        this.repository = new ReservationRepository();
    }
    
    public void processReservationMessage(String messagePayload) {
        try {
            logger.info("Processando mensagem de reserva...");
            
            // Deserializar JSON para objeto
            ReservationData reservation = objectMapper.readValue(messagePayload, ReservationData.class);
            
            // Validar dados básicos
            if (reservation.getUuid() == null || reservation.getCustomer() == null || 
                reservation.getHotel() == null || reservation.getRooms() == null || 
                reservation.getPayment() == null) {
                throw new IllegalArgumentException("Dados de reserva incompletos");
            }
            
            // Salvar no banco de dados
            repository.saveReservation(reservation);
            
            logger.info("Reserva {} processada e salva com sucesso", reservation.getUuid());
            
        } catch (Exception e) {
            logger.error("Erro ao processar mensagem de reserva: {}", e.getMessage(), e);
            throw new RuntimeException("Falha no processamento da reserva", e);
        }
    }
}