import styles from "./thank.module.css"
export default function page() {
    return (
        <>
            <main className={styles.mainClass}>
                <section className={styles.pageSection}>
                    <h1>Donation Details</h1>
                    <div className={styles.message}>
                        <div className={styles.successIcon}>
                            <img src="/images/Success-Icon.png" alt="Success Icon" width="70" height="70" className={styles.successImg} />
                        </div>
                        <div className={styles.successMessage}>
                            <h2>Thank you for your generous contribution! Your donation will directly support our heroes in need. Together, we can ensure they receive the timely help they deserve. If you have opted for 80G certificate, it will be sent to you within 48 hours.</h2>
                        </div>
                    </div>
                    <div className={styles.successTable}>
                        <table className={styles.pageTable}>
                            <tbody className={styles.tableBody}>
                            <tr className={styles.tableRow}>
                                <th className={styles.tableHead}>Transaction Status</th>
                                <td className={`${styles.tableColumn} ${styles.green}`}>Success</td>
                            </tr>
                            <tr>
                                <th className={styles.tableHead}>Transaction Reference Number</th>
                                <td className={styles.tableColumn}>abcdefghi2156782</td>
                            </tr>
                            <tr>
                                <th className={styles.tableHead}>Transaction Date & Time</th>
                                <td className={styles.tableColumn}>29-05-2024 23:26:03</td>
                            </tr>
                            <tr>
                                <th className={styles.tableHead}>Mode Of Payment</th>
                                <td className={styles.tableColumn}>UPI</td>
                            </tr>
                            <tr>
                                <th className={styles.tableHead}>Email</th>
                                <td className={styles.tableColumn}>xyz123@gmail.com</td>
                            </tr>
                            <tr>
                                <th className={styles.tableHead}>Phone Number</th>
                                <td className={styles.tableColumn}>9876543210</td>
                            </tr>
                            <tr>
                                <th className={styles.tableHead}>Payment Amount (&#8377;)</th>
                                <td className={styles.tableColumn}>1,250</td>
                            </tr>
                            <tr>
                                <th className={styles.tableHead}>Receipt:</th>
                                <td className={styles.tableColumn}><a href="#" className={styles.tableLink}>Download Receipt</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.groupbtn}>
                        <button type="submit" className={styles.donateBtn}>Make Another Donation</button>
                        <button type="submit" className={`${styles.donateBtn} ${styles.filled}`}>Done</button>
                    </div>
                </section>
            </main>
        </>
    )
};
