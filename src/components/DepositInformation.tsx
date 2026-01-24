import React from "react";
import SectionHeader from "./SectionHeader";
import styles from "../styles/frontend/securityInformation.module.css";
import {
  Shield,
  CreditCard,
  FileText,
  Clock,
  AlertCircle,
  MessageCircle,
  Phone,
} from "lucide-react";
import { PHONE_NUMBER_FORMATTED, WHATSAPP_URL, DEFAULT_INQUIRY_MESSAGE } from "../lib/constants";

const SecurityDeposit: React.FC = () => {
  return (
    <section className="pb-16 bg-[#f4f4f580] relative">
      <SectionHeader
        title="Deposit & Security Policy"
        description="Understanding our transparent deposit and security procedures"
      />
      <div
        className={`${styles.glowOrb}`}
        style={{ bottom: "0", left: "5%" }}
      ></div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardcorneraccent}></div>

          {/* Header Section */}
          <header className={styles.header}>
            <div className={styles.mainIconContainer}>
              <Shield className={styles.shieldIcon} size={32} />
            </div>
            <div>
              <h1 className={styles.mainTitle}>Security Deposit Information</h1>
              <p className={styles.mainSubtitle}>
                Important details about our deposit policy
              </p>
            </div>
          </header>

          {/* Info Grid */}
          <div className={styles.grid}>
            {/* Left Column */}
            <div className={styles.column}>
              <div className={styles.infoItem}>
                <CreditCard className={styles.itemIcon} size={20} />
                <div>
                  <h3 className={styles.itemTitle}>Deposit Authorization</h3>
                  <p className={styles.itemText}>
                    A deposit is an amount <strong>blocked</strong> on the
                    customer credit card or cash <em>(not charged)</em>.
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock className={styles.itemIcon} size={20} />
                <div>
                  <h3 className={styles.itemTitle}>30-Day Hold Period</h3>
                  <p className={styles.itemText}>
                    The deposit is blocked for 30 days. After that we transfer
                    to Credit Card or Bank Account.
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <AlertCircle className={styles.itemIcon} size={20} />
                <div>
                  <h3 className={styles.itemTitle}>Damage & Fine Policy</h3>
                  <p className={styles.itemText}>
                    We charge customers for any fines, scratches, or damages
                    done to the car which wasnt resolved on spot or after the
                    car returned.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.column}>
              <div className={styles.infoItem}>
                <FileText className={styles.itemIcon} size={20} />
                <div>
                  <h3 className={styles.itemTitle}>Proof & Documentation</h3>
                  <p className={styles.itemText}>
                    We provide customers with proof for any fines/damages done
                    on the car for complete transparency.
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Shield className={styles.itemIconGreen} size={20} />
                <div>
                  <h3 className={styles.itemTitle}>Flexible Scheduling</h3>
                  <p className={styles.itemText}>
                    If anything happens that might affect your scheduled
                    request, we manage it and inform you of any rescheduling if
                    needed.
                  </p>
                </div>
              </div>

              {/* Support Box */}
              <div className={styles.supportBox}>
                <div className={styles.supportTitleRow}>
                  <Phone className={styles.supportIcon} size={18} />
                  <span className={styles.supportLabel}>Deposit Support</span>
                </div>
                <p className={styles.supportInstruction}>
                  For deposit complaints or follow-up:
                </p>
                <a 
                  href={WHATSAPP_URL(`Hi, I have a question about my security deposit. ${DEFAULT_INQUIRY_MESSAGE}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactRow}
                >
                  <MessageCircle className={styles.supportIcon} size={18} />
                  <span className={styles.phoneNumber}>{PHONE_NUMBER_FORMATTED}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityDeposit;
