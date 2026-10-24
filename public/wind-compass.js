(function () {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  function svgEl(name, attrs, text) {
    const node = document.createElementNS(NS, name);
    for (const [key, value] of Object.entries(attrs || {})) node.setAttribute(key, String(value));
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function windCompass(degrees) {
    const angle = Number(degrees);
    if (!Number.isFinite(angle)) return null;
    const heading = ((angle % 360) + 360) % 360;
    const svg = svgEl('svg', {
      viewBox: '0 0 120 120', width: '110', height: '110', role: 'img',
      'aria-label': `Wind coming from ${Math.round(heading)} degrees and blowing towards ${(Math.round(heading) + 180) % 360} degrees`
    });
    svg.append(svgEl('circle', {cx:60,cy:60,r:42,fill:'none',stroke:'#9fb7c4','stroke-width':1.6}));
    for (const [label,x,y] of [['N',60,12],['E',108,64],['S',60,116],['W',12,64]]) {
      svg.append(svgEl('text', {x,y,'font-size':11,'font-weight':700,'text-anchor':'middle',fill:'#395972'},label));
    }
    const pointer = svgEl('g', {transform:`rotate(${heading} 60 60)`});
    pointer.append(svgEl('path',{d:'M60 22 L68 60 L60 54 L52 60 Z',fill:'#ea741d'}));
    pointer.append(svgEl('path',{d:'M60 98 L52 60 L60 66 L68 60 Z',fill:'#1688c2'}));
    svg.append(pointer,svgEl('circle',{cx:60,cy:60,r:4,fill:'#173a55'}));
    return svg;
  }

  function createWindWidget(spot) {
    const current = spot && spot.data && spot.data.current;
    if (!current || current.wind_direction_10m === null || current.wind_direction_10m === undefined) return null;
    const angle = Number(current.wind_direction_10m);
    if (!Number.isFinite(angle)) return null;
    const compass = windCompass(angle);
    const heading = ((angle % 360) + 360) % 360;
    const dir = directions[Math.round(heading / 45) % 8];
    const wrap = document.createElement('section');
    wrap.className = 'wind-widget';
    wrap.setAttribute('aria-label','Wind measurements');
    wrap.append(compass);
    const details = document.createElement('div');
    details.className = 'wind-values';
    const title = document.createElement('strong');
    title.textContent = `${dir} · ${Math.round(heading)}°`;
    details.append(title);
    const speed = Number(current.wind_speed_10m);
    const gust = Number(current.wind_gusts_10m);
    for(const [label,value] of [['Wind',speed],['Gusts',gust]]) {
      if(Number.isFinite(value) && value >= 0) {
        const p=document.createElement('p');
        p.textContent=`${label}: ${value.toFixed(1)} kn`;
        details.append(p);
      }
    }
    wrap.append(details);
    return wrap;
  }

  window.SurfWind = { createWindWidget };
}());
