package com.grupob.pubsubsubscriber;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.pubsub.v1.AckReplyConsumer;
import com.google.cloud.pubsub.v1.MessageReceiver;
import com.google.cloud.pubsub.v1.Subscriber;
import com.google.pubsub.v1.ProjectSubscriptionName;
import com.grupob.pubsubsubscriber.config.DatabaseConfig;
import com.grupob.pubsubsubscriber.exception.DuplicateUuidException;
import com.grupob.pubsubsubscriber.service.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;

public class HotelReservationSubscriber {
    private static final Logger logger = LoggerFactory.getLogger(HotelReservationSubscriber.class);
    
    public static void main(String[] args) throws IOException {
        String projectId = "serjava-demo";
        String subscriptionId = "grupo-b-sub";
        String credentialsPath = "./serjava-demo-5dcefdb67b21.json";

        // Registrar shutdown hook para fechar recursos
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            logger.info("Encerrando aplicação...");
            DatabaseConfig.close();
        }));

        subscribeAsync(projectId, subscriptionId, credentialsPath);
    }

    public static void subscribeAsync(String projectId, String subscriptionId, String credentialsPath) throws IOException {
        ProjectSubscriptionName subscriptionName = ProjectSubscriptionName.of(projectId, subscriptionId);
        ReservationService reservationService = new ReservationService();

        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsPath));
        
        MessageReceiver receiver = (message, consumer) -> {
            String messagePayload = message.getData().toStringUtf8();
            
            logger.info("---------------------------------");
            logger.info("Mensagem Recebida!");
            logger.info("  ID: {}", message.getMessageId());
            logger.info("  Timestamp: {}", message.getPublishTime());
            logger.info("---------------------------------");

            try {
                // Processar e salvar a reserva
                reservationService.processReservationMessage(messagePayload);
                
                // Confirmar processamento
                consumer.ack();
                logger.info("Mensagem {} processada com sucesso", message.getMessageId());
                
            } catch (DuplicateUuidException e) {
                // UUID duplicado - mensagem já foi processada, fazer ACK para evitar reprocessamento
                logger.warn("UUID duplicado detectado para mensagem {}: {}. Fazendo ACK para evitar reprocessamento.", 
                           message.getMessageId(), e.getMessage());
                consumer.ack();
                
            } catch (Exception e) {
                logger.error("Erro inesperado ao processar mensagem {}: {}. Fazendo NACK para reprocessamento.", 
                            message.getMessageId(), e.getMessage(), e);
                consumer.nack();
            }
        };

        Subscriber subscriber = null;
        try {
            subscriber = Subscriber.newBuilder(subscriptionName, receiver)
                    .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                    .build();

            subscriber.startAsync().awaitRunning();

            logger.info("Escutando mensagens na assinatura: {}", subscriptionName.toString());
            logger.info("Pressione Ctrl+C para encerrar a aplicação.");

            subscriber.awaitTerminated();

        } finally {
            if (subscriber != null) {
                subscriber.stopAsync();
            }
        }
    }
    
    /**
     * Verifica se o erro SQL é relacionado a chave duplicada
     */
    private static boolean isDuplicateKeyError(SQLException e) {
        // Códigos comuns para chave duplicada:
        // MySQL: 1062
        // PostgreSQL: 23505
        // SQL Server: 2627
        // Oracle: 1
        int errorCode = e.getErrorCode();
        String sqlState = e.getSQLState();
        
        return errorCode == 1062 || // MySQL
               errorCode == 23505 || // PostgreSQL
               errorCode == 2627 || // SQL Server
               errorCode == 1 || // Oracle
               (sqlState != null && sqlState.startsWith("23")); // SQL State para constraint violation
    }
}