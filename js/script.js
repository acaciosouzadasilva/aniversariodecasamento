function atualizarTempo() {
    const dataInicial = new Date('2012-07-07T00:00:00');
    const agora = new Date();
    let diffMs = agora - dataInicial;

    const msPorSegundo = 1000;
    const msPorMinuto = msPorSegundo * 60;
    const msPorHora = msPorMinuto * 60;
    const msPorDia = msPorHora * 24;
    const msPorAno = msPorDia * 365.25;
    const msPorMes = msPorAno / 12;

    const anos = Math.floor(diffMs / msPorAno);
    diffMs -= anos * msPorAno;

    const meses = Math.floor(diffMs / msPorMes);
    diffMs -= meses * msPorMes;

    const dias = Math.floor(diffMs / msPorDia);
    diffMs -= dias * msPorDia;

    const horas = Math.floor(diffMs / msPorHora);
    diffMs -= horas * msPorHora;

    const minutos = Math.floor(diffMs / msPorMinuto);
    diffMs -= minutos * msPorMinuto;

    const segundos = Math.floor(diffMs / msPorSegundo);

    document.getElementById("tempo").textContent =
      `Casados há: ${anos} anos, ${meses} meses, ${dias} dias, ` +
      `${horas} horas, ${minutos} minutos e ${segundos} segundos`;
  }

  atualizarTempo(); // Chama ao carregar
  setInterval(atualizarTempo, 1000); // Atualiza a cada 1 segundo