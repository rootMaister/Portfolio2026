function Frame3() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-[709.5px]">
      <p className="relative shrink-0">About</p>
      <p className="relative shrink-0">Resume</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="capitalize content-stretch flex font-['Pacaembu:Light',sans-serif] items-center justify-between relative shrink-0 text-[#565656] text-[12px] text-right tracking-[0.96px] w-full whitespace-nowrap">
      <Frame3 />
      <p className="relative shrink-0">english</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[557px]">
      <p className="font-['Hedvig_Letters_Serif:Regular',sans-serif] relative shrink-0 text-[26px] text-black tracking-[1.04px] w-full">Vitor C. Costa</p>
      <p className="font-['Halyard_Display:Book',sans-serif] relative shrink-0 text-[#6e6e6e] text-[16px] text-justify tracking-[0.8px] w-full">6 anos transformando pesquisa em interface e interface em resultado. Sou designer com experiência em todo o ciclo de produto — da descoberta à entrega. Trabalho com B2C, B2B e B2B2C, construindo experiências digitais consistentes, escaláveis e centradas nas pessoas que realmente as usam.</p>
    </div>
  );
}

export default function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start leading-[normal] not-italic relative size-full">
      <Frame />
      <Frame1 />
    </div>
  );
}