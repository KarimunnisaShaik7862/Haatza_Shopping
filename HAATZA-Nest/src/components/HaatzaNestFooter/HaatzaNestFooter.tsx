import React from 'react';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import googlePlayBadge from '../../assets/google-play-badge.svg';
import appStoreBadge from '../../assets/app-store-badge.svg';

export const HaatzaNestFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('explore-home-services-heading');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#240643] text-white pt-0 select-none">
      
      {/* =========================================================================
          TOP DECORATIVE CITY SKYLINE SILHOUETTE
          - Directly inspired by the reference illustration:
            Rolling contoured hills, city skyline high-rises, stylized trees,
            Ferris wheel, and hot air balloon.
          - Multi-layered parallax depth (background layer #3C1268, foreground #240643)
          ========================================================================= */}
      <div className="w-full relative leading-none bg-[#F7F1FF]">
        <svg
          viewBox="0 0 1600 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-28 sm:h-36 md:h-48 block -mb-[1px] select-none pointer-events-none"
          preserveAspectRatio="none"
        >
<g fill="#380F65" opacity="0.4">
<rect x="36" y="24" width="30" height="110" rx="1" />
<rect x="74" y="12" width="34" height="122" rx="1" />
<polygon points="91,0 84,12 98,12" />
<rect x="116" y="22" width="28" height="112" rx="1" />
<rect x="152" y="36" width="30" height="98" rx="1" />
<rect x="635" y="60" width="28" height="85" rx="1" />
<rect x="670" y="44" width="32" height="101" rx="1" />
<rect x="858" y="52" width="30" height="93" rx="1" />
<rect x="896" y="66" width="26" height="79" rx="1" />
<rect x="1235" y="30" width="32" height="85" rx="1" />
<rect x="1275" y="10" width="38" height="105" rx="1" />
<polygon points="1294,0 1287,10 1301,10" />
<rect x="1320" y="22" width="30" height="93" rx="1" />
<rect x="1358" y="32" width="28" height="83" rx="1" />
<rect x="1430" y="42" width="30" height="73" rx="1" />
</g>
<g fill="#240643">
<polygon points="18,140 18,65 38,52 42,52 42,140" />
<polygon points="46,140 46,42 70,42 70,50 80,50 80,140" />
<rect x="84" y="28" width="40" height="112" rx="1" />
<polygon points="104,10 97,28 111,28" />
<rect x="128" y="48" width="30" height="92" rx="1" />
<rect x="141" y="36" width="3.5" height="12" />
<polygon points="162,140 162,36 196,52 200,52 200,140" />
<rect x="204" y="80" width="24" height="60" rx="1" />
<rect x="612" y="84" width="26" height="62" rx="1" />
<polygon points="612,84 625,72 638,84" />
<rect x="642" y="68" width="32" height="78" rx="1" />
<rect x="678" y="78" width="28" height="68" rx="1" />
<rect x="710" y="88" width="26" height="58" rx="1" />
<rect x="842" y="78" width="28" height="68" rx="1" />
<rect x="874" y="62" width="34" height="84" rx="1" />
<polygon points="874,62 891,46 908,62" />
<rect x="912" y="74" width="26" height="72" rx="1" />
<rect x="942" y="86" width="24" height="60" rx="1" />
<rect x="1208" y="52" width="28" height="68" rx="1" />
<polygon points="1240,120 1240,32 1266,32 1266,42 1276,42 1276,120" />
<rect x="1280" y="18" width="46" height="102" rx="1" />
<polygon points="1303,0 1295,18 1311,18" />
<polygon points="1330,120 1330,28 1362,46 1366,46 1366,120" />
<rect x="1370" y="46" width="30" height="74" rx="1" />
<rect x="1404" y="38" width="36" height="82" rx="1" />
<polygon points="1404,38 1422,22 1440,38" />
<rect x="1444" y="54" width="30" height="66" rx="1" />
<rect x="1478" y="62" width="32" height="58" rx="1" />
<rect x="1514" y="72" width="28" height="48" rx="1" />
</g>
<g>
<rect x="22" y="62" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="30" y="62" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="22" y="68.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="30" y="68.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="22" y="75" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="30" y="75" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="22" y="81.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="30" y="81.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="22" y="88" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="30" y="88" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="22" y="94.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="30" y="94.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="22" y="101" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="30" y="101" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="22" y="107.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="30" y="107.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="50" y="50" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="58" y="50" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="66" y="50" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="50" y="57.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="58" y="57.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="66" y="57.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="50" y="65" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="58" y="65" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="66" y="65" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="50" y="72.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="58" y="72.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="66" y="72.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="50" y="80" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="58" y="80" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="66" y="80" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="50" y="87.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="58" y="87.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="66" y="87.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="50" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="58" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="66" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="50" y="102.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="58" y="102.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="66" y="102.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="50" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="58" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="66" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="34" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="34" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="34" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="41.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="41.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="41.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="49" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="49" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="49" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="56.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="56.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="56.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="64" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="64" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="64" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="71.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="71.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="71.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="79" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="79" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="79" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="86.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="86.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="86.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="94" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="94" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="94" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="101.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="101.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="101.5" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="89" y="109" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="99" y="109" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="109" y="109" width="6" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="133" y="56" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="141" y="56" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="133" y="63" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="141" y="63" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="133" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="141" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="133" y="77" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="141" y="77" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="133" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="141" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="133" y="91" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="141" y="91" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="133" y="98" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="141" y="98" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="133" y="105" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="141" y="105" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="133" y="112" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="141" y="112" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="168" y="50" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="176" y="50" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="184" y="50" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="168" y="57.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="176" y="57.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="184" y="57.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="168" y="65" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="176" y="65" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="184" y="65" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="168" y="72.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="176" y="72.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="184" y="72.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="168" y="80" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="176" y="80" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="184" y="80" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="168" y="87.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="176" y="87.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="184" y="87.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="168" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="176" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="184" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="168" y="102.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="176" y="102.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="184" y="102.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="168" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="176" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="184" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="208" y="86" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="215" y="86" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="208" y="92.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="215" y="92.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="208" y="99" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="215" y="99" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="208" y="105.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="215" y="105.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="208" y="112" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="215" y="112" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="616" y="88" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="624" y="88" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="616" y="94.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="624" y="94.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="616" y="101" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="624" y="101" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="616" y="107.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="624" y="107.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="616" y="114" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="624" y="114" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="647" y="74" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="655" y="74" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="663" y="74" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="647" y="81" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="655" y="81" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="663" y="81" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="647" y="88" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="655" y="88" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="663" y="88" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="647" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="655" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="663" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="647" y="102" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="655" y="102" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="663" y="102" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="647" y="109" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="655" y="109" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="663" y="109" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="647" y="116" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="655" y="116" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="663" y="116" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="683" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="691" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="683" y="90.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="691" y="90.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="683" y="97" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="691" y="97" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="683" y="103.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="691" y="103.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="683" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="691" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="683" y="116.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="691" y="116.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="714" y="94" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="721" y="94" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="714" y="100.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="721" y="100.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="714" y="107" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="721" y="107" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="714" y="113.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="721" y="113.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="847" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="855" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="847" y="90.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="855" y="90.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="847" y="97" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="855" y="97" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="847" y="103.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="855" y="103.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="847" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="855" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="847" y="116.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="855" y="116.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="879" y="68" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="887" y="68" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="895" y="68" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="879" y="75" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="887" y="75" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="895" y="75" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="879" y="82" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="887" y="82" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="895" y="82" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="879" y="89" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="887" y="89" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="895" y="89" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="879" y="96" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="887" y="96" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="895" y="96" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="879" y="103" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="887" y="103" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="895" y="103" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="879" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="887" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="895" y="110" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="879" y="117" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="887" y="117" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="895" y="117" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="917" y="80" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="924" y="80" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="917" y="86.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="924" y="86.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="917" y="93" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="924" y="93" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="917" y="99.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="924" y="99.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="917" y="106" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="924" y="106" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="917" y="112.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="924" y="112.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="917" y="119" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="924" y="119" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="946" y="92" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="953" y="92" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="946" y="98.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="953" y="98.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="946" y="105" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="953" y="105" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="946" y="111.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="953" y="111.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1213" y="60" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1221" y="60" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1213" y="67" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1221" y="67" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1213" y="74" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1221" y="74" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1213" y="81" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1221" y="81" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1213" y="88" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1221" y="88" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1213" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1221" y="95" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1245" y="40" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1253" y="40" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1261" y="40" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1245" y="47.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1253" y="47.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1261" y="47.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1245" y="55" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1253" y="55" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1261" y="55" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1245" y="62.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1253" y="62.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1261" y="62.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1245" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1253" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1261" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1245" y="77.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1253" y="77.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1261" y="77.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1245" y="85" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1253" y="85" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1261" y="85" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1245" y="92.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1253" y="92.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1261" y="92.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="24" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="24" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="24" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="24" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="31.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="31.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="31.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="31.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="39" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="39" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="39" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="39" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="46.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="46.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="46.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="46.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="54" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="54" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="54" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="54" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="61.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="61.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="61.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="61.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="69" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="69" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="69" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="69" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="76.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="76.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="76.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="76.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="91.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="91.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="91.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="91.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1286" y="99" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1294" y="99" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1302" y="99" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1310" y="99" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1336" y="40" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1344" y="40" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1352" y="40" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1336" y="47.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1344" y="47.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1352" y="47.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1336" y="55" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1344" y="55" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1352" y="55" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1336" y="62.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1344" y="62.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1352" y="62.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1336" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1344" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1352" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1336" y="77.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1344" y="77.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1352" y="77.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1336" y="85" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1344" y="85" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1352" y="85" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1336" y="92.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1344" y="92.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1352" y="92.5" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1375" y="54" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1383" y="54" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1375" y="61" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1383" y="61" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1375" y="68" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1383" y="68" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1375" y="75" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1383" y="75" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1375" y="82" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1383" y="82" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1375" y="89" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1383" y="89" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1375" y="96" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1383" y="96" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1410" y="44" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1418" y="44" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1426" y="44" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1410" y="51" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1418" y="51" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1426" y="51" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1410" y="58" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1418" y="58" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1426" y="58" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1410" y="65" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1418" y="65" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1426" y="65" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1410" y="72" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1418" y="72" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1426" y="72" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1410" y="79" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1418" y="79" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1426" y="79" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1410" y="86" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1418" y="86" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1426" y="86" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1410" y="93" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1418" y="93" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1426" y="93" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1449" y="62" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1457" y="62" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1449" y="69" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1457" y="69" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1449" y="76" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1457" y="76" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1449" y="83" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1457" y="83" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1449" y="90" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1457" y="90" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1449" y="97" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1457" y="97" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1483" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1491" y="70" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1483" y="77" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1491" y="77" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1483" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1491" y="84" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1483" y="91" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1491" y="91" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1483" y="98" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1491" y="98" width="5" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1519" y="78" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1526" y="78" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1519" y="84.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1526" y="84.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1519" y="91" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1526" y="91" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1519" y="97.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
<rect x="1526" y="97.5" width="4" height="2.5" rx="0.5" fill="#FAF5FF" />
</g>

    <g id="ferris-wheel" transform="translate(742, 38)">
      <circle cx="44" cy="44" r="42" fill="none" stroke="#240643" strokeWidth="3" />
      <circle cx="44" cy="44" r="38" fill="none" stroke="#240643" strokeWidth="1.5" />
      <circle cx="44" cy="44" r="26" fill="none" stroke="#240643" strokeWidth="1.2" />
      <circle cx="44" cy="44" r="6" fill="#240643" />
      <circle cx="44" cy="44" r="2" fill="#FAF5FF" />

      <line x1="44" y1="2" x2="44" y2="86" stroke="#240643" strokeWidth="1.4" />
      <line x1="2" y1="44" x2="86" y2="44" stroke="#240643" strokeWidth="1.4" />
      <line x1="14" y1="14" x2="74" y2="74" stroke="#240643" strokeWidth="1.4" />
      <line x1="14" y1="74" x2="74" y2="14" stroke="#240643" strokeWidth="1.4" />
      <line x1="29" y1="5" x2="59" y2="83" stroke="#240643" strokeWidth="1.2" />
      <line x1="59" y1="5" x2="29" y2="83" stroke="#240643" strokeWidth="1.2" />
      <line x1="5" y1="29" x2="83" y2="59" stroke="#240643" strokeWidth="1.2" />
      <line x1="5" y1="59" x2="83" y2="29" stroke="#240643" strokeWidth="1.2" />

      <line x1="44" y1="44" x2="22" y2="105" stroke="#240643" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="44" y1="44" x2="66" y2="105" stroke="#240643" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="28" y1="78" x2="60" y2="78" stroke="#240643" strokeWidth="2" />

      <circle cx="44" cy="2" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="86" cy="44" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="44" cy="86" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="2" cy="44" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="74" cy="14" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="74" cy="74" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="14" cy="74" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="14" cy="14" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="59" cy="5" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="83" cy="29" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="83" cy="59" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="59" cy="83" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="29" cy="83" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="5" cy="59" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="5" cy="29" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
      <circle cx="29" cy="5" r="3.2" fill="#240643" stroke="#FAF5FF" strokeWidth="0.8" />
    </g>
  
    <g id="hot-air-balloon" transform="translate(976, 8)">
      <path d="M 22,2 C 7,2 0,16 11,32 L 17,42 L 27,42 L 33,32 C 44,16 37,2 22,2 Z" fill="#240643" />
      <path d="M 22,2 C 16,8 14,24 18,42" stroke="#FAF5FF" strokeWidth="1.2" fill="none" opacity="0.85" />
      <path d="M 22,2 C 28,8 30,24 26,42" stroke="#FAF5FF" strokeWidth="1.2" fill="none" opacity="0.85" />
      <line x1="18" y1="42" x2="19" y2="47" stroke="#240643" strokeWidth="1" />
      <line x1="26" y1="42" x2="25" y2="47" stroke="#240643" strokeWidth="1" />
      <rect x="18" y="47" width="8" height="6" rx="1.2" fill="#240643" />
    </g>
  <g id="trees">

      <rect x="232" y="52" width="4" height="70" fill="#240643" />
      <circle cx="234" cy="52" r="16" fill="#240643" />
    
      <rect x="261.5" y="38" width="5" height="72" fill="#240643" />
      <circle cx="264" cy="38" r="22" fill="#240643" />
    
      <rect x="296.5" y="54" width="3" height="44" fill="#240643" />
      <circle cx="298" cy="54" r="15" fill="#240643" />
    
      <rect x="324" y="42" width="4" height="42" fill="#240643" />
      <circle cx="326" cy="42" r="18" fill="#240643" />
    
      <rect x="503.5" y="78" width="3" height="40" fill="#240643" />
      <circle cx="505" cy="78" r="14" fill="#240643" />
    
      <rect x="533" y="94" width="4" height="36" fill="#240643" />
      <circle cx="535" cy="94" r="18" fill="#240643" />
    
      <rect x="566.5" y="108" width="3" height="30" fill="#240643" />
      <circle cx="568" cy="108" r="15" fill="#240643" />
    
      <rect x="1043" y="90" width="4" height="50" fill="#240643" />
      <circle cx="1045" cy="90" r="16" fill="#240643" />
    
      <rect x="1077.5" y="72" width="5" height="60" fill="#240643" />
      <circle cx="1080" cy="72" r="22" fill="#240643" />
    
      <rect x="1118.5" y="84" width="3" height="40" fill="#240643" />
      <circle cx="1120" cy="84" r="15" fill="#240643" />
    
      <rect x="1152.5" y="66" width="5" height="50" fill="#240643" />
      <circle cx="1155" cy="66" r="23" fill="#240643" />
    
      <rect x="1188" y="78" width="4" height="32" fill="#240643" />
      <circle cx="1190" cy="78" r="17" fill="#240643" />
    </g>

    <path
      d="M 0,132
         L 20,132
         C 120,132 180,128 220,122
         C 280,114 330,44 410,42
         C 460,40 500,78 570,120
         C 640,140 730,144 820,144
         C 910,144 980,140 1050,132
         C 1130,124 1190,108 1260,104
         C 1340,100 1480,104 1600,108
         L 1600,200
         L 0,200
         Z"
      fill="#240643"
    />
  
        </svg>
      </div>

      {/* =========================================================================
          MAIN FOOTER BODY (Deep Purple Background #240643)
          ========================================================================= */}
      <div className="relative w-full overflow-hidden">
        {/* Subtle Background Watermark Text "Haatza Nest" */}
        <div aria-hidden="true" className="haatza-footer-watermark-wrap">
          <span className="haatza-footer-watermark">Haatza Nest</span>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-8 sm:pb-10 flex flex-col items-center justify-center text-center">
          
          {/* Brand Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading">
            Haatza Nest
          </h2>

          {/* Uppercase Tagline */}
          <p className="mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-purple-200/90 font-heading">
            SAFE HANDS. FRESH HOMES. COMPLETE PEACE OF MIND.
          </p>

          {/* Pill Badges */}
          <div className="mt-5 sm:mt-6 flex items-center justify-center flex-wrap gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs sm:text-sm font-medium text-white shadow-xs">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Verified & Safe Platform</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs sm:text-sm font-medium text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-white" />
              <span>100% Verified Helpers • Zero Brokerage</span>
            </div>
          </div>

          {/* Action Buttons: Back to Top & Book a Service */}
          <div className="mt-5 sm:mt-6 flex items-center justify-center flex-wrap gap-3">
            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 shadow-xs"
            >
              <span>↑ Back to Top ↑</span>
            </button>

            <a
              href="#explore-home-services-heading"
              onClick={handleExploreServices}
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-white hover:bg-[#FFD83D] text-[#240643] font-extrabold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 shadow-md hover:shadow-lg"
            >
              <span>Book a Service</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* App Store & Google Play Download Badges (Below Buttons Row) */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center flex-wrap gap-3.5">
            <a
              href="https://play.google.com/store/apps/details?id=com.haatzaindia.haatza"
              target="_blank"
              rel="noopener noreferrer"
              title="Download HAATZA on Google Play"
              aria-label="Get it on Google Play"
              className="inline-block transition-transform duration-200 hover:scale-105 hover:opacity-95 active:scale-95 cursor-pointer rounded-lg overflow-hidden shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD83D]/50"
            >
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="h-9 sm:h-[38px] w-auto object-contain block"
                loading="lazy"
              />
            </a>
            <a
              href="https://apps.apple.com/in/app/haatza-shop-house-help/id6745472868"
              target="_blank"
              rel="noopener noreferrer"
              title="Download HAATZA on the App Store"
              aria-label="Download on the App Store"
              className="inline-block transition-transform duration-200 hover:scale-105 hover:opacity-95 active:scale-95 cursor-pointer rounded-lg overflow-hidden shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD83D]/50"
            >
              <img
                src={appStoreBadge}
                alt="Download on the App Store"
                className="h-9 sm:h-[38px] w-auto object-contain block"
                loading="lazy"
              />
            </a>
          </div>

          {/* Thin Divider Line */}
          <div className="w-full max-w-3xl border-t border-white/15 my-6 sm:my-8" />

          {/* Bottom Copyright & Location */}
          <p className="text-xs text-purple-200/80 font-normal flex items-center justify-center flex-wrap gap-1.5">
            <span>© 2026 Haatza India Private Limited. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Built with <span className="text-purple-300">💜</span> in Bengaluru</span>
          </p>

        </div>
      </div>

    </footer>
  );
};
