</main>  <script>
    // ====== Ideias de manchete: edite aqui! ======
    const ideias = [
      "Clima ou Caô?",
      "Fato ou Fatoide?",
      "Aquecimento ou Conversinha?",
      "Boato Congelado vs Dado Quente",
      "Mito, Migué ou Meteorologia?",
      "Tempestade de Boatos",
      "Fatos em Chamas (e Mitos no Gelo)",
      "Queimando Fake News",
      "SOS: Sinais, Não Sussurros",
      "Vento de Verdades, Névoa de Mitos"
    ];

    // ====== Efeitos de texto (typewriter + scramble) ======
    const elLead = document.getElementById('lead');
    const btnTrocar = document.getElementById('btnTrocar');
    const btnCopiar = document.getElementById('btnCopiar');
    let idx = 0;

    function typewriter(text, speed = 32){
      return new Promise(resolve => {
        elLead.textContent = '';
        let i = 0;
        const iv = setInterval(() => {
          elLead.textContent += text[i++] || '';
          if(i > text.length){ clearInterval(iv); resolve(); }
        }, speed);
      });
    }

    function scrambleTo(text, duration = 600){
      // efeito estilo "embaralhar" para a transição do lead
      const chars = '!<>-_@/[]{}—=+*^?#________';
      const from = elLead.textContent;
      const len = Math.max(from.length, text.length);
      const queue = [];
      for(let i=0;i<len;i++){
        const fromChar = from[i] || '';
        const toChar = text[i] || '';
        const start = Math.floor(Math.random()*duration*0.6);
        const end = start + Math.floor(Math.random()*duration*0.6);
        queue.push({fromChar, toChar, start, end});
      }
      let t0 = performance.now();
      function frame(now){
        const t = now - t0;
        let out = '';
        let complete = 0;
        for(const q of queue){
          if(t < q.start){ out += q.fromChar; }
          else if(t > q.end){ out += q.toChar; complete++; }
          else { out += chars[Math.floor(Math.random()*chars.length)]; }
        }
        elLead.textContent = out;
        if(complete < queue.length){ requestAnimationFrame(frame); }
      }
      requestAnimationFrame(frame);
    }

    async function trocarTitulo(){
      idx = (idx + 1) % ideias.length;
      const next = ideias[idx];
      scrambleTo(next);
    }

    // Copia o título final como uma string para colar em outro site
    function copiarTexto(){
      const tituloFinal = `${elLead.textContent} Fake News Climáticas 🌎🔎🧪`;
      navigator.clipboard.writeText(tituloFinal).then(()=>{
        btnCopiar.textContent = 'Copiado! ✅';
        setTimeout(()=> btnCopiar.textContent = 'Copiar para usar no meu site', 1400);
      });
    }

    // Efeito de hover: leve distorção
    const titulo = document.getElementById('titulo');
    titulo.addEventListener('pointermove', (e)=>{
      const rect = titulo.getBoundingClientRect();
      const x = (e.clientX - rect.left)/rect.width - .5;
      const y = (e.clientY - rect.top)/rect.height - .5;
      titulo.style.transform = `perspective(800px) rotateX(${y*-4}deg) rotateY(${x*6}deg)`;
    });
    titulo.addEventListener('pointerleave', ()=>{
      titulo.style.transform = 'none';
    });

    // Adesivos/emoji flutuantes para vibe divertida
    const stickers = '🌎 🌡️ 🔎 🧪 🚫 🛰️ 📊 💬 🧊 🌪️ ☀️ 🌧️'.split(' ');
    const layer = document.querySelector('.stickers');
    for(let i=0;i<10;i++){
      const s = document.createElement('div');
      s.className = 'sticker';
      s.textContent = stickers[Math.floor(Math.random()*stickers.length)];
      s.style.left = Math.random()*100 + '%';
      s.style.top = (10 + Math.random()*70) + '%';
      s.style.setProperty('--r', (Math.random()*10-5) + 'deg');
      s.style.setProperty('--t', (7 + Math.random()*6) + 's');
      layer.appendChild(s);
    }

    // Inicialização (primeiro título com efeito de digitação)
    typewriter(ideias[idx]).then(()=>{
      setTimeout(()=> scrambleTo(ideias[idx]), 400);
    });

    // Botões
    btnTrocar.addEventListener('click', trocarTitulo);
    btnCopiar.addEventListener('click', copiarTexto);
  </script></body>
</html>
