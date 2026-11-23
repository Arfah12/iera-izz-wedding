
import "./EventDetails.css";
import { weddingData } from "../config/weddingData";

export default function EventDetails() {
  const event = weddingData.akad;

  return (
    <section className="event-section" id="event-details">

      {/* HEADER */}
      <div className="event-header">
        <p className="event-eyebrow">SAVE THE DATE</p>

        <h2 className="event-heading">
          Join Our <em>Celebration</em>
        </h2>

        <p className="event-subheading">
          Dengan penuh kesyukuran, kami menjemput
          Tuan/Puan sekeluarga untuk meraikan
          hari bahagia kami.
          <br />
          <span>
            With grateful hearts, we warmly invite you
            and your family to celebrate our special day.
          </span>
        </p>
      </div>

      {/* AKAD NIKAH EVENT CARD */}
      <div className="event-grid">
        <article className="event-card">

          <span className="event-number">01</span>

        

          <h3 className="event-title">{event.title}</h3>
          <p className="event-title-en">
            Wedding Solemnisation Ceremony
          </p>

          <div className="event-divider" />

          <div className="event-info">
            <div className="event-info-item">
              <span className="event-info-label">DAY & DATE</span>
              <p>{event.day}, {event.date}</p>
            </div>

            <div className="event-info-item">
              <span className="event-info-label">TIME</span>
              <p>{event.time}</p>
            </div>

            <div className="event-info-item">
              <span className="event-info-label">VENUE</span>
              <p>{event.venue}</p>
              <small>{event.address}</small>
            </div>

          </div>

          <div className="event-buttons">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              VIEW LOCATION
            </a>
          </div>

        </article>
      </div>

      {/* WEDDING PROGRAMME */}
      <div className="event-schedule">

        <div className="schedule-header">
          <p className="event-eyebrow">THE DAY'S PROGRAMME</p>

          <h3>
            Wedding <em>Itinerary</em>
          </h3>

          <p>
            Atur Cara Majlis Pada Hari Istimewa Kami
            <br />
            <span>
              Schedule of Events for Our Special Day.
            </span>
          </p>
        </div>

        <div className="schedule-list">
          {weddingData.programme.map((item, index) => (
            <div className="schedule-item" key={index}>

              <div className="schedule-time">
                {item.time}
              </div>

              <div className="schedule-line">
                <span className="schedule-dot" />
              </div>

              <div className="schedule-activity">
                <p>{item.titleMy}</p>
                <small>{item.titleEn}</small>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* CONTACT */}
      <div className="event-contact">

        <p className="event-eyebrow">NEED ASSISTANCE?</p>

        <h3>
          Get In <em>Touch</em>
        </h3>

        <p className="contact-description">
          Untuk sebarang pertanyaan, sila hubungi wakil keluarga kami.
          <br />
          For any enquiries, feel free to contact our family representatives.
        </p>

        {/* BRIDE'S FAMILY */}
        <div className="contact-group">

          <h4 className="contact-group-title">
            Pihak Pengantin Perempuan
            <span>Bride's Family</span>
          </h4>

          <div className="contact-list">
            {weddingData.contacts
              .filter((contact) => contact.title.includes("Perempuan"))
              .map((contact, index) => (
                <div className="contact-item" key={index}>

                  <div className="contact-details">
                    <span>{contact.title}</span>
                    <small className="contact-title-en">
                      {contact.titleEn}
                    </small>
                    <strong>{contact.name}</strong>
                  </div>

                  <a
                    href={`https://wa.me/${contact.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-button"
                  >
                    WHATSAPP
                  </a>

                </div>
              ))}
          </div>

        </div>

        {/* GROOM'S FAMILY */}
        <div className="contact-group">

          <h4 className="contact-group-title">
            Pihak Pengantin Lelaki
            <span>Groom's Family</span>
          </h4>

          <div className="contact-list">
            {weddingData.contacts
              .filter((contact) => contact.title.includes("Lelaki"))
              .map((contact, index) => (
                <div className="contact-item" key={index}>

                  <div className="contact-details">
                    <span>{contact.title}</span>
                    <small className="contact-title-en">
                      {contact.titleEn}
                    </small>
                    <strong>{contact.name}</strong>
                  </div>

                  <a
                    href={`https://wa.me/${contact.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-button"
                  >
                    WHATSAPP
                  </a>

                </div>
              ))}
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="event-footer">
        WE LOOK FORWARD TO CELEBRATING WITH YOU
      </div>

    </section>
  );
}
