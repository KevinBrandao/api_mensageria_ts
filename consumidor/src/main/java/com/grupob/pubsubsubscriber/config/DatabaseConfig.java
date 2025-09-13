package com.grupob.pubsubsubscriber.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import javax.sql.DataSource;

public class DatabaseConfig {
    private static final String DB_URL = "jdbc:postgresql://localhost:5432/mensageria";
    private static final String DB_USERNAME = "postgres";
    private static final String DB_PASSWORD = "postgres";
    
    private static HikariDataSource dataSource;
    
    static {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(DB_URL);
        config.setUsername(DB_USERNAME);
        config.setPassword(DB_PASSWORD);
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);
        
        dataSource = new HikariDataSource(config);
    }
    
    public static DataSource getDataSource() {
        return dataSource;
    }
    
    public static void close() {
        if (dataSource != null) {
            dataSource.close();
        }
    }
}
