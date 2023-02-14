// components/Prototypes.jsx
export default function Prototypes() {
    return (
        <main>
            <div className="prototypes">{prototypes.map(prototype => {
                const { id, thumbnail, title, price, desc, pieUrl } = prototype;
                return (<div className="prototype" key={id}>
                    <a href={pieUrl} target="_BLANK">
                        <div style={{
                            padding: "25px 0 33px 0",
                        }}>
                            <video
                                autoPlay
                                loop
                                playsInline
                                className="prototype__artwork prototype__edit"
                                src={thumbnail}
                                style={{
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </a>
                    <div className="prototype__body">
                        <div className="prototype__title">
                            <div className="btn btn--primary float--right">
                                <i className="icon icon--plus" />
                            </div>

                            {title}
                        </div>
                        <p className="prototype__price">$ {price}</p>
                        <p className="prototype__desc">{desc}</p>
                    </div>
                </div>);
            })}</div>
        </main>
    );
}