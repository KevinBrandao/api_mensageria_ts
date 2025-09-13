package com.grupob.pubsubsubscriber.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservationData {
    private String uuid;
    
    @JsonProperty("created_at")
    private LocalDateTime createdAt;
    
    private String type;
    private Customer customer;
    private Hotel hotel;
    private List<Room> rooms;
    private Payment payment;
    private Metadata metadata;

    // Getters e Setters
    public UUID getUuid() { return UUID.fromString(uuid); }
    public void setUuid(String uuid) { this.uuid = uuid; }

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public Hotel getHotel() { return hotel; }
    public void setHotel(Hotel hotel) { this.hotel = hotel; }

    public List<Room> getRooms() { return rooms; }
    public void setRooms(List<Room> rooms) { this.rooms = rooms; }

    public Payment getPayment() { return payment; }
    public void setPayment(Payment payment) { this.payment = payment; }

    public Metadata getMetadata() { return metadata; }
    public void setMetadata(Metadata metadata) { this.metadata = metadata; }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Customer {
        private Long id;
        private String name;
        private String email;
        private String document;

        // Getters e Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getDocument() { return document; }
        public void setDocument(String document) { this.document = document; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Hotel {
        private Long id;
        private String name;
        private String city;
        private String state;

        // Getters e Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Room {
        private Long id;
        
        @JsonProperty("room_number")
        private String roomNumber;
        
        @JsonProperty("daily_rate")
        private Double dailyRate;
        
        @JsonProperty("number_of_days")
        private Integer numberOfDays;
        
        @JsonProperty("checkin_date")
        private LocalDate checkinDate;
        
        @JsonProperty("checkout_date")
        private LocalDate checkoutDate;
        
        private Category category;
        private String status;
        private Integer guests;
        
        @JsonProperty("breakfast_included")
        private Boolean breakfastIncluded;

        // Getters e Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getRoomNumber() { return roomNumber; }
        public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

        public Double getDailyRate() { return dailyRate; }
        public void setDailyRate(Double dailyRate) { this.dailyRate = dailyRate; }

        public Integer getNumberOfDays() { return numberOfDays; }
        public void setNumberOfDays(Integer numberOfDays) { this.numberOfDays = numberOfDays; }

        public LocalDate getCheckinDate() { return checkinDate; }
        public void setCheckinDate(LocalDate checkinDate) { this.checkinDate = checkinDate; }

        public LocalDate getCheckoutDate() { return checkoutDate; }
        public void setCheckoutDate(LocalDate checkoutDate) { this.checkoutDate = checkoutDate; }

        public Category getCategory() { return category; }
        public void setCategory(Category category) { this.category = category; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public Integer getGuests() { return guests; }
        public void setGuests(Integer guests) { this.guests = guests; }

        public Boolean getBreakfastIncluded() { return breakfastIncluded; }
        public void setBreakfastIncluded(Boolean breakfastIncluded) { this.breakfastIncluded = breakfastIncluded; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Category {
        private String id;
        private String name;
        
        @JsonProperty("sub_category")
        private SubCategory subCategory;

        // Getters e Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public SubCategory getSubCategory() { return subCategory; }
        public void setSubCategory(SubCategory subCategory) { this.subCategory = subCategory; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SubCategory {
        private String id;
        private String name;

        // Getters e Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Payment {
        private String method;
        private String status;
        
        @JsonProperty("transaction_id")
        private String transactionId;

        // Getters e Setters
        public String getMethod() { return method; }
        public void setMethod(String method) { this.method = method; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getTransactionId() { return transactionId; }
        public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Metadata {
        private String source;
        
        @JsonProperty("user_agent")
        private String userAgent;
        
        @JsonProperty("ip_address")
        private String ipAddress;

        // Getters e Setters
        public String getSource() { return source; }
        public void setSource(String source) { this.source = source; }

        public String getUserAgent() { return userAgent; }
        public void setUserAgent(String userAgent) { this.userAgent = userAgent; }

        public String getIpAddress() { return ipAddress; }
        public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    }
}