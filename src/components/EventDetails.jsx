
import "./EventDetails.css";
import { weddingData } from "../config/weddingData";

const events = [
  {
    number: "01",
    day: "SATURDAY",
    title: "Akad Nikah",
    date: "12 June 2027",
    time: "9:00 AM – 11:00 AM",
    venue: "Dewan Seri Indah",
    address: "Parit Buntar, Perak",
    map: "#",
  },
  {
    number: "02",
    day: "SATURDAY",
    title: "Majlis Resepsi",
    date: "12 June 2027",
    time: "12:00 PM – 4:00 PM",
    venue: "Dewan Seri Indah",
    address: "Parit Buntar, Perak",
    map: "#",
  },
];

const schedule = [
  { time: "8:30 AM", activity: "Ketibaan para tetamu" },
  { time: "9:00 AM", activity: "Majlis akad nikah bermula" },
  { time: "10:00 AM", activity: "Sesi bergambar bersama keluarga" },
  { time: "12:00 PM", activity: "Ketibaan pengantin & majlis resepsi" },
  { time: "1:00 PM", activity: "Jamuan makan beradab" },
  { time: "2:00 PM", activity: "Sesi bergambar bersama pengantin" },
  { time: "4:00 PM", activity: "Majlis bersurai" },
];

export default function EventDetails() {
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
        </p>
      </div>

      {/* EVENT CARDS */}
      <div className="event-grid">
        {events.map((event) => (
          <article className="event-card" key={event.number}>
            <span className="event-number">{event.number}</span>

            <p className="event-day">{event.day}</p>

            <h3 className="event-title">{event.title}</h3>

            <div className="event-divider" />

            <div className="event-info">
              <div className="event-info-item">
                <span className="event-info-label">DATE</span>
                <p>{event.date}</p>
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
                href={event.map}
                target="_blank"
                rel="noreferrer"
              >
                VIEW LOCATION ↗
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* TENTATIF */}
      <div className="event-schedule">
        <div className="schedule-header">
          <p className="event-eyebrow">THE DAY'S PROGRAMME</p>

          <h3>
            Wedding <em>Itinerary</em>
          </h3>

          <p>
            Atur cara majlis pada hari istimewa kami.
          </p>
        </div>

        <div className="schedule-list">
          {schedule.map((item, index) => (
            <div className="schedule-item" key={index}>
              <div className="schedule-time">
                {item.time}
              </div>

              <div className="schedule-line">
                <span className="schedule-dot" />
              </div>

              <div className="schedule-activity">
                {item.activity}
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
          For any enquiries, feel free to contact our family representatives.
        </p>

        <div className="contact-list">
          {weddingData.contacts.map((contact, index) => (
            <div className="contact-item" key={index}>

              <div className="contact-details">
                <span>{contact.title}</span>
                <strong>{contact.name}</strong>
              </div>

              <a
                href={`https://wa.me/${contact.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-button"
              >
                WHATSAPP ↗
              </a>

            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="event-footer">
        WE LOOK FORWARD TO CELEBRATING WITH YOU
      </div>

    </section>
  );
}
