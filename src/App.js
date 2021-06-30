import "./App.css";
// import TextWithImage from "./TextWithImage";
// import SecondaryButton from "./SecondaryButton";
import useCookie from "./useCookie";
import ProductCard from "./ProductCard";

function App() {
  const [allowGAcookie, updateAllowGAcookie] = useCookie(
    "allowGoogleAnalytics",
    false
  );

  return (
    <div className="mx-auto container">
      {/* <TextWithImage
        imgSrc="https://i.insider.com/5de5784979d757159d0b6838?width=700"
        children={
          <div>
            <div className="mb-6 font-bold text-5xl leading-tight">
              Zaveza uporabnikom
            </div>
            <div className="text-lg font-light mb-10">
              Želimo ponuditi najboljše možne izdelke z visoko kakovostnimi
              sestavinami, brez aditivov, v varnem pakiranju in za vse okuse.
            </div>
            <SecondaryButton title="Zelim izvedeti vec"></SecondaryButton>
          </div>
        }
      /> */}
      {/* <div className="flex">
        <ProductCard
          productImg="https://www.argeta.com/app/uploads/2019/01/Kokosja-front-1-320x0-c-default.png"
          title="Argeta"
          description="Bogata izbira dobrot."
          cta="odkrij okuse"
        />
        <ProductCard
          productImg="https://www.argeta.com/app/uploads/2019/01/Kokosja-front-1-320x0-c-default.png"
          title="Argeta"
          description="Bogata izbira dobrot."
          cta="odkrij okuse"
        />
      </div> */}
      {/* cookie test */}
      <div>
        <h1>allow Google Analytics: {allowGAcookie}</h1>
        <button
          className="bg-gray-200"
          onClick={() => {
            updateAllowGAcookie(true, 10);
          }}
        >
          Click to allow GA
        </button>
      </div>
    </div>
  );
}

export default App;
