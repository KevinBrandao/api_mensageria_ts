package com.grupob.pubsubsubscriber.repository;

import com.grupob.pubsubsubscriber.config.DatabaseConfig;
import com.grupob.pubsubsubscriber.model.ReservationData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.time.LocalDateTime;

public class ReservationRepository {
    private static final Logger logger = LoggerFactory.getLogger(ReservationRepository.class);
    
    public void saveReservation(ReservationData reservation) throws SQLException {
        Connection conn = null;
        try {
            conn = DatabaseConfig.getDataSource().getConnection();
            conn.setAutoCommit(false);
            
            // Salvar cliente (INSERT ou UPDATE)
            saveCustomer(conn, reservation.getCustomer());
            
            // Salvar hotel (INSERT ou UPDATE)
            saveHotel(conn, reservation.getHotel());
            
            // Salvar reserva
            saveReservationData(conn, reservation);
            
            // Salvar quartos reservados
            saveReservedRooms(conn, reservation);
            
            // Salvar pagamento
            savePayment(conn, reservation);
            
            conn.commit();
            logger.info("Reserva {} salva com sucesso", reservation.getUuid());
            
        } catch (SQLException e) {
            if (conn != null) {
                conn.rollback();
            }
            logger.error("Erro ao salvar reserva {}: {}", reservation.getUuid(), e.getMessage());
            throw e;
        } finally {
            if (conn != null) {
                conn.close();
            }
        }
    }
    
    private void saveCustomer(Connection conn, ReservationData.Customer customer) throws SQLException {
        String sql = """
            INSERT INTO clientes (id, name, email, document, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?) 
            ON CONFLICT (id) DO UPDATE SET 
                name = EXCLUDED.name,
                email = EXCLUDED.email,
                document = EXCLUDED.document,
                updated_at = CURRENT_TIMESTAMP
            """;
            
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, customer.getId());
            stmt.setString(2, customer.getName());
            stmt.setString(3, customer.getEmail());
            stmt.setString(4, customer.getDocument());
            stmt.setTimestamp(5, Timestamp.valueOf(LocalDateTime.now()));   
            stmt.setTimestamp(6, Timestamp.valueOf(LocalDateTime.now()));   
            stmt.executeUpdate();
        }
    }
    
    private void saveHotel(Connection conn, ReservationData.Hotel hotel) throws SQLException {
        String sql = """
            INSERT INTO hotel (id, name, city, state, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?) 
            ON CONFLICT (id) DO UPDATE SET 
                name = EXCLUDED.name,
                city = EXCLUDED.city,
                state = EXCLUDED.state,
                updated_at = CURRENT_TIMESTAMP
            """;
            
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setLong(1, hotel.getId());
            stmt.setString(2, hotel.getName());
            stmt.setString(3, hotel.getCity());
            stmt.setString(4, hotel.getState());
            stmt.setTimestamp(5, Timestamp.valueOf(LocalDateTime.now()));   
            stmt.setTimestamp(6, Timestamp.valueOf(LocalDateTime.now()));   
            stmt.executeUpdate();
        }
    }
    
    private void saveReservationData(Connection conn, ReservationData reservation) throws SQLException {
        String sql = """
            INSERT INTO reserva (uuid, customer_id, hotel_id, created_at, type, indexed_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """;
            
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setObject(1, reservation.getUuid());
            stmt.setLong(2, reservation.getCustomer().getId());
            stmt.setLong(3, reservation.getHotel().getId());
            stmt.setTimestamp(4, Timestamp.valueOf(reservation.getCreatedAt()));
            stmt.setString(5, reservation.getType());
            stmt.setTimestamp(6, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setTimestamp(7, Timestamp.valueOf(LocalDateTime.now()));   
            stmt.executeUpdate();
        }
    }
    
    private void saveReservedRooms(Connection conn, ReservationData reservation) throws SQLException {
        String sql = """
            INSERT INTO quartos_reserva 
            (booking_uuid, room_number, daily_rate, number_of_days, checkin_date, checkout_date, 
        		category_name, status, guests, breakfast_included, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """;
            
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            for (ReservationData.Room room : reservation.getRooms()) {
                stmt.setObject(1, reservation.getUuid());
                stmt.setString(2, room.getRoomNumber());
                stmt.setBigDecimal(3, java.math.BigDecimal.valueOf(room.getDailyRate()));
                stmt.setInt(4, room.getNumberOfDays());
                stmt.setDate(5, Date.valueOf(room.getCheckinDate()));
                stmt.setDate(6, Date.valueOf(room.getCheckoutDate()));
                stmt.setString(7, room.getCategory().getName());
                stmt.setString(8, room.getStatus());
                stmt.setInt(9, room.getGuests());
                stmt.setBoolean(10, room.getBreakfastIncluded());
                stmt.setTimestamp(11, Timestamp.valueOf(LocalDateTime.now()));       
                stmt.setTimestamp(12, Timestamp.valueOf(LocalDateTime.now()));   
                stmt.addBatch();
            }
            stmt.executeBatch();
        }
    }
    
    private void savePayment(Connection conn, ReservationData reservation) throws SQLException {
        String sql = """
            INSERT INTO pagamento (booking_uuid, method, status, transaction_id, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?)
            """;
            
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            ReservationData.Payment payment = reservation.getPayment();
            stmt.setObject(1, reservation.getUuid());
            stmt.setString(2, payment.getMethod());
            stmt.setString(3, payment.getStatus());
            stmt.setString(4, payment.getTransactionId());
            stmt.setTimestamp(5, Timestamp.valueOf(LocalDateTime.now()));       
            stmt.setTimestamp(6, Timestamp.valueOf(LocalDateTime.now()));   
            stmt.executeUpdate();
        }
    }
}