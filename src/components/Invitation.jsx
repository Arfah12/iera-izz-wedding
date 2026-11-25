
import "./Invitation.css";
import { weddingData } from "../config/weddingData";

export default function Invitation() {
  return (
    <section className="invitation-section">
      <div className="invitation-container">


        {/* Bismillah */}
       
        <p className="invitation-bismillah">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        {/* Arabic Greeting */}
        <p className="invitation-arabic-greeting">
          ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
        </p>

        <div className="invitation-ornament">✦</div>

        {/* Opening Malay */}
        <p className="invitation-request">
          Dengan nama Allah Yang Maha Pemurah lagi Maha Penyayang,
          kami
        </p>

        {/* English Translation */}
        <p className="invitation-english">
          In the name of Allah, the Most Gracious and the Most Merciful, we
        </p>
        <p className="invitation-arabic-greeting-1">
PIHAK PEREMPUAN
</p>

        {/* Bride's Parents */}
        <div className="invitation-parents">
          <h3>{weddingData.parentsBride}</h3>
        </div>
     <p className="invitation-arabic-greeting-1">
PIHAK LELAKI
</p>
        {/* Groom's Parents */}
        <div className="invitation-parents">
          <h3>{weddingData.parentsGroom}</h3>
        </div>

        {/* Invitation Text */}
        <p className="invitation-request">
          Dengan penuh kesyukuran, menjemput Tuan/Puan/Encik/Cik
        </p>

        <p className="invitation-english">
          With gratitude to the Almighty, we cordially invite you 
        </p>

        {/* Marriage Ceremony */}
        <p className="invitation-request">
          Untuk meraikan majlis pernikahan:
        </p>

        <p className="invitation-english">
          To join us in celebrating the wedding of:
        </p>

        {/* Couple Names */}
        <div className="invitation-couple">
          <h3>{weddingData.brideName}</h3>

          <span>&</span>

          <h3>{weddingData.groomName}</h3>
        </div>

        <p className="invitation-date">
          {weddingData.weddingDateDisplay}
        </p>

        <div className="invitation-ornament">✦</div>

        {/* Closing */}
        <p className="invitation-closing">
          Kehadiran serta doa restu daripada tuan/puan amatlah kami hargai
        </p>

                <p className="invitation-english">
           Your presence and blessings would mean so much to us
        </p>

        <p className="invitation-footer">
          TERIMA KASIH
        </p>

         <p className="invitation-english">
          THANK YOU
        </p>

      </div>
    </section>
  );
}
