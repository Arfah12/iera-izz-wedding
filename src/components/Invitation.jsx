
import "./Invitation.css";
import { weddingData } from "../config/weddingData";

export default function Invitation() {
  return (
    <section className="invitation-section">
      <div className="invitation-container">

        <p className="invitation-bismillah">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <p className="invitation-bismillah-translation">
          Dengan Nama Allah Yang Maha Pemurah Lagi Maha Penyayang
        </p>

        <div className="invitation-ornament">✦</div>

        <p className="invitation-opening">
          ASSALAMUALAIKUM WARAHMATULLAHI WABARAKATUH
        </p>

        <p className="invitation-honorific">
          Dengan penuh kesyukuran ke hadrat Ilahi,
          <br />
          kami
        </p>

        <div className="invitation-parents">
          <h3>{weddingData.parentsBride}</h3>
          <span>&</span>
          <h3>{weddingData.parentsGroom}</h3>
        </div>

        <p className="invitation-request">
          Dengan segala hormatnya menjemput
        </p>

        <h2 className="invitation-guest">
          Dato' / Datin / Tuan / Puan
          <br />
          serta keluarga
        </h2>

        <p className="invitation-request">
          ke majlis perkahwinan putera dan puteri kami
        </p>

        <div className="invitation-couple">
          <h3>{weddingData.brideName}</h3>
          <span>&</span>
          <h3>{weddingData.groomName}</h3>
        </div>

        <p className="invitation-date">
          {weddingData.weddingDateDisplay}
        </p>

        <div className="invitation-ornament">✦</div>

        <p className="invitation-closing">
          Kehadiran dan doa restu daripada pihak
          tuan/puan amatlah kami hargai.
        </p>

        <p className="invitation-footer">
          TERIMA KASIH
        </p>

      </div>
    </section>
  );
}
