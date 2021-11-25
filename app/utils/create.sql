CREATE DATABASE sda;

USE sda;

CREATE TABLE ITR_UF(SG_UF varchar(2) UNIQUE NOT NULL PRIMARY KEY,
					NM_UF varchar(50) NOT NULL
                      );
                     
CREATE TABLE itr_pais(CD_PAIS varchar(2) UNIQUE NOT NULL PRIMARY KEY,
						NM_PAIS varchar(100) NOT NULL,
						QT_PPLC_PAIS bigint
                      ) ;


CREATE TABLE ITR_ARPT(CD_ARPT varchar(3) UNIQUE NOT NULL PRIMARY KEY,
						CD_PAIS varchar(2) NOT NULL,
						SG_UF varchar(2),
						NM_CIDADE varchar(100) NOT NULL,
						FOREIGN KEY(CD_PAIS) REFERENCES ITR_PAIS(CD_PAIS),
						FOREIGN KEY(SG_UF) REFERENCES ITR_UF(SG_UF)
						
                      ) ; 
                     
CREATE TABLE ITR_CMPN_AEREA(CD_CMPN_AEREA varchar(2) UNIQUE  NOT NULL PRIMARY KEY,
							NM_CMPN_AEREA varchar(100) NOT NULL,
							CD_PAIS varchar(2)
							
                      
                      ) ;
                     
CREATE TABLE ITR_EQPT(CD_EQPT varchar(3) UNIQUE NOT NULL PRIMARY KEY,
						NM_EQPT varchar(100) NOT NULL,
						DC_TIPO_EQPT varchar(25) NOT NULL,
						QT_MOTOR int NOT NULL,
						IC_TIPO_PRPS varchar(1) NOT NULL,
						QT_PSGR INT,
						CONSTRAINT qt_motor_VALID CHECK (qt_motor BETWEEN 1 AND 5),
                      	CONSTRAINT ic_tipo_prps_VALID CHECK (ic_tipo_prps = 'M' OR ic_tipo_prps = 'R')
					) ; 


CREATE TABLE ITR_ARNV(CD_ARNV varchar(5) UNIQUE NOT NULL PRIMARY KEY,
						CD_EQPT varchar(3) NOT NULL,
						CD_CMPN_AEREA varchar(2) NOT NULL,
						FOREIGN KEY(CD_EQPT) REFERENCES ITR_EQPT(CD_EQPT),
						FOREIGN KEY(CD_CMPN_AEREA) REFERENCES ITR_CMPN_AEREA(CD_CMPN_AEREA)
);



CREATE TABLE ITR_ROTA_VOO(NR_ROTA_VOO int UNIQUE NOT NULL PRIMARY KEY,
							CD_ARPT_ORIG varchar(3) NOT NULL,
							CD_ARPT_DEST varchar(3) NOT NULL,
							VR_PASG int,
							FOREIGN KEY(CD_ARPT_ORIG) REFERENCES ITR_ARPT(CD_ARPT),
							FOREIGN KEY(CD_ARPT_DEST) REFERENCES ITR_ARPT(CD_ARPT)

                      );

CREATE TABLE ITR_PSGR (CD_PSGR int UNIQUE NOT NULL PRIMARY KEY AUTO_INCREMENT,
						NM_PSGR varchar(100) NOT NULL,
						IC_SEXO_PSGR varchar(1) NOT NULL,
						DT_NASC_PSGR varchar(10),
						CD_PAIS varchar(2),
						IC_ESTD_CIVIL varchar(1),
						CD_PSGR_RESP int,
						FOREIGN KEY (CD_PAIS) REFERENCES ITR_PAIS(cd_pais),
						FOREIGN KEY (CD_PSGR_RESP) REFERENCES ITR_PSGR(CD_PSGR),
                        CHECK(IC_ESTD_CIVIL = 'C' OR IC_ESTD_CIVIL = 'S')
                         );
                        
                        
CREATE TABLE ITR_VOO (NR_VOO int NOT NULL,
						DT_SAIDA_VOO varchar(10) NOT NULL,
						NR_ROTA_VOO int NOT NULL,
						CD_ARNV varchar(5) NOT NULL,
						PRIMARY KEY(NR_VOO,DT_SAIDA_VOO),
						FOREIGN KEY(CD_ARNV) REFERENCES ITR_ARNV(CD_ARNV),
						FOREIGN KEY(NR_ROTA_VOO) REFERENCES ITR_ROTA_VOO(NR_ROTA_VOO)
  			
        );

CREATE TABLE ITR_RESV(CD_PSGR int NOT NULL,
						NR_VOO int NOT NULL,
						DT_SAIDA_VOO varchar(10) NOT NULL,
						PC_DESC_PASG int,
						FOREIGN KEY (CD_PSGR) REFERENCES ITR_PSGR(CD_PSGR),
                      				FOREIGN KEY (NR_VOO,DT_SAIDA_VOO) REFERENCES ITR_VOO(NR_VOO,DT_SAIDA_VOO) 
                      );

SET FOREIGN_KEY_CHECKS=0;
