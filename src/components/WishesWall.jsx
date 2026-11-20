
import { useEffect, useState } from "react";
import { listenToWishes } from "../services/wishesService";
import "./WishesWall.css";

const avatarColors = [
  "avatar-mocha",
  "avatar-sage",
  "avatar-rose",
  "avatar-grey",
  "avatar-sand",
];

export default function WishesWall() {
  const [wishes, setWishes] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = listenToWishes(setWishes);
    return () => unsubscribe();
  }, []);

  // Reset index apabila jumlah wishes berubah
  useEffect(() => {
    setStartIndex(0);
  }, [wishes.length]);

  // Maksimum 4 wishes pada satu masa
  const visibleWishes = wishes.slice(
    startIndex,
    startIndex + 4
  );

  // Tukar kumpulan secara perlahan
  useEffect(() => {
    if (wishes.length <= 4) return;

    const interval = setInterval(() => {
      setStartIndex((current) => {
        if (current + 4 >= wishes.length) {
          return 0;
        }

        return current + 1;
      });
    }, 9000);

    return () => clearInterval(interval);
  }, [wishes.length]);

  return (
    <section className="wishes-wall">
      <div className="wishes-wall-container">

        {/* HEADING */}
        <div className="wishes-wall-heading">
          <p>HEARTFELT WORDS FROM OUR GUESTS</p>

          <h2>
            Little Notes, <i>Big Love.</i>
          </h2>

          <span>
            A little collection of love and wishes.
          </span>
        </div>

        {/* WISHES */}
        {wishes.length === 0 ? (
          <p className="wishes-empty">
            Be the first to leave a little note.
          </p>
        ) : (
          <div className="wishes-chat-window">
            <div
              className="wishes-chat-list"
              key={startIndex}
            >
              {visibleWishes.map((wish, index) => {
                const isRight =
                  (startIndex + index) % 2 === 0;

                const initial =
                  wish.name?.trim()?.charAt(0)?.toUpperCase() || "?";

                const avatarColor =
                  avatarColors[(startIndex + index) % avatarColors.length];

                return (
                  <div
                    className={`wish-chat-row ${
                      isRight ? "chat-right" : "chat-left"
                    }`}
                    key={wish.id}
                    style={{
                      animationDelay: `${index * 0.25}s`,
                    }}
                  >
                    <div className="wish-chat-content">

                      {/* NAME AND AVATAR */}
                      <div className="wish-chat-user">

                        {!isRight && (
                          <div className={`wish-avatar ${avatarColor}`}>
                            {initial}
                          </div>
                        )}

                        <span className="wish-chat-name">
                          {wish.name}
                        </span>

                        {isRight && (
                          <div className={`wish-avatar ${avatarColor}`}>
                            {initial}
                          </div>
                        )}

                      </div>

                      {/* MESSAGE */}
                      <div className="wish-chat-bubble">
                        {wish.message}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="wishes-wall-footer">
          <span>MADE WITH LOVE</span>
          <span>♡</span>
        </div>

      </div>
    </section>
  );
}
