-- ====================================
-- 1. Module Utilisateurs & Social
-- ====================================

-- Users table

CREATE TABLE Users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    avatar VARCHAR(200),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT UC_Users_Email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Publications table

CREATE TABLE Publications (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    publication_date TIMESTAMP NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Publications_User FOREIGN KEY (user_id) 
        REFERENCES Users(id) ON DELETE CASCADE,
    INDEX IDX_Publications_User (user_id),
    INDEX IDX_Publications_Date (publication_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comments table

CREATE TABLE Comments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    comment_date TIMESTAMP NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    publication_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Comments_User FOREIGN KEY (user_id) 
        REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT FK_Comments_Publication FOREIGN KEY (publication_id) 
        REFERENCES Publications(id) ON DELETE CASCADE,
    INDEX IDX_Comments_User (user_id),
    INDEX IDX_Comments_Publication (publication_id),
    INDEX IDX_Comments_Date (comment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- UserGroups table

CREATE TABLE UserGroups (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    creation_date TIMESTAMP NOT NULL,
    creator_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_UserGroups_Creator FOREIGN KEY (creator_id) 
        REFERENCES Users(id) ON DELETE RESTRICT,
    INDEX IDX_UserGroups_Creator (creator_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- GroupMembers table

CREATE TABLE GroupMembers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    join_date TIMESTAMP NOT NULL,
    member_status VARCHAR(20) NOT NULL,
    member_role VARCHAR(20) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    group_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_GroupMembers_User FOREIGN KEY (user_id) 
        REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT FK_GroupMembers_Group FOREIGN KEY (group_id) 
        REFERENCES UserGroups(id) ON DELETE CASCADE,
    CONSTRAINT UC_GroupMembers_UserGroup UNIQUE (user_id, group_id),
    INDEX IDX_GroupMembers_User (user_id),
    INDEX IDX_GroupMembers_Group (group_id),
    INDEX IDX_GroupMembers_Status (member_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Messages table

CREATE TABLE Messages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    send_date TIMESTAMP NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    group_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Messages_User FOREIGN KEY (user_id) 
        REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT FK_Messages_Group FOREIGN KEY (group_id) 
        REFERENCES UserGroups(id) ON DELETE CASCADE,
    INDEX IDX_Messages_User (user_id),
    INDEX IDX_Messages_Group (group_id),
    INDEX IDX_Messages_Date (send_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Friendships table

CREATE TABLE Friendships (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    creation_date TIMESTAMP NOT NULL,
    user1_id INT UNSIGNED NOT NULL,
    user2_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Friendships_User1 FOREIGN KEY (user1_id) 
        REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT FK_Friendships_User2 FOREIGN KEY (user2_id) 
        REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT UC_Friendship_Users UNIQUE (user1_id, user2_id),
    CONSTRAINT CHK_Different_Users CHECK (user1_id != user2_id),
    CONSTRAINT CHK_User_Order CHECK (user1_id < user2_id),
    INDEX IDX_Friendships_Users (user1_id, user2_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- 2. Module Ressources
-- ====================================

CREATE TABLE Resources (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    type ENUM('document','image','video','autre') NOT NULL,
    parent_id INT UNSIGNED DEFAULT NULL,
    owner_id INT UNSIGNED NOT NULL,
    visibility ENUM('public','privé') DEFAULT 'privé',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Resources_Parent FOREIGN KEY (parent_id) REFERENCES Resources(id) ON DELETE CASCADE,
    CONSTRAINT FK_Resources_Owner FOREIGN KEY (owner_id) REFERENCES Users(id) ON DELETE CASCADE,
    INDEX IDX_Resources_Parent (parent_id),
    INDEX IDX_Resources_Owner (owner_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ResourceMetadata (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    resource_id INT UNSIGNED NOT NULL,
    key_name VARCHAR(100) NOT NULL,
    value TEXT,
    CONSTRAINT FK_Metadata_Resource FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    INDEX IDX_Metadata_Resource (resource_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ResourcePermissions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    resource_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    permission ENUM('lecture','écriture','admin') NOT NULL,
    CONSTRAINT FK_Permissions_Resource FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    CONSTRAINT FK_Permissions_User FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT UC_Permissions UNIQUE (resource_id,user_id),
    INDEX IDX_Permissions_Resource (resource_id),
    INDEX IDX_Permissions_User (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- 3. Module Événements
-- ====================================

CREATE TABLE Events (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location_type ENUM('physique','en ligne','hybride') NOT NULL,
    location_details VARCHAR(300),
    group_id INT UNSIGNED DEFAULT NULL,
    creator_id INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_Events_Group FOREIGN KEY (group_id) REFERENCES UserGroups(id) ON DELETE SET NULL,
    CONSTRAINT FK_Events_Creator FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE,
    INDEX IDX_Events_Group (group_id),
    INDEX IDX_Events_Creator (creator_id),
    INDEX IDX_Events_Date (event_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE EventParticipants (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    status ENUM('invité','confirmé','refusé') DEFAULT 'invité',
    CONSTRAINT FK_Participants_Event FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE,
    CONSTRAINT FK_Participants_User FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT UC_Event_User UNIQUE (event_id,user_id),
    INDEX IDX_EventParticipants_Event (event_id),
    INDEX IDX_EventParticipants_User (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE EventResources (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    event_id INT UNSIGNED NOT NULL,
    resource_id INT UNSIGNED NOT NULL,
    CONSTRAINT FK_EventResources_Event FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE,
    CONSTRAINT FK_EventResources_Resource FOREIGN KEY (resource_id) REFERENCES Resources(id) ON DELETE CASCADE,
    INDEX IDX_EventResources_Event (event_id),
    INDEX IDX_EventResources_Resource (resource_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================
-- 4. Module Notifications
-- ====================================

CREATE TABLE Notifications (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    content TEXT NOT NULL,
    type ENUM('info','alerte','message') DEFAULT 'info',
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Notifications_User FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    INDEX IDX_Notifications_User (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;