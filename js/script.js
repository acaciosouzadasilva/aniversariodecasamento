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
// o script de coracao comeca aqui
// Obtém o elemento canvas e seu contexto de renderização 2D
        const canvas = document.getElementById('fallingHeartsCanvas');
        const ctx = canvas.getContext('2d');

        // Define o tamanho do canvas para preencher a janela
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Redimensiona o canvas ao carregar a página e ao redimensionar a janela
        window.addEventListener('load', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);

        // Array para armazenar os corações
        const hearts = [];

        // Classe para representar um coração individual
        class Heart {
            constructor() {
                this.reset();
            }

            // Reinicia as propriedades do coração (usado para novos corações ou corações que saem da tela)
            reset() {
                this.x = Math.random() * canvas.width; // Posição X aleatória
                this.y = -20 - Math.random() * canvas.height * 0.5; // Começa acima da tela
                this.size = 10 + Math.random() * 20; // Tamanho aleatório
                this.speed = 1 + Math.random() * 2; // Velocidade de queda aleatória
                this.opacity = 0.5 + Math.random() * 0.5; // Opacidade aleatória
                this.rotation = Math.random() * Math.PI * 2; // Rotação inicial aleatória
                this.rotationSpeed = (Math.random() - 0.5) * 0.05; // Velocidade de rotação aleatória
            }

            // Atualiza a posição e rotação do coração
            update() {
                this.y += this.speed; // Move o coração para baixo
                this.rotation += this.rotationSpeed; // Atualiza a rotação

                // Se o coração sair da tela, reinicia-o no topo
                if (this.y > canvas.height + this.size) {
                    this.reset();
                }
            }

            // Desenha o coração no canvas
            draw() {
                ctx.save(); // Salva o estado atual do contexto
                ctx.translate(this.x, this.y); // Move a origem para a posição do coração
                ctx.rotate(this.rotation); // Aplica a rotação

                ctx.fillStyle = `rgba(255, 0, 100, ${this.opacity})`; // Cor do coração (rosa/vermelho) com opacidade
                ctx.beginPath();
                // Desenha a forma do coração usando arcos e linhas
                ctx.moveTo(0, -this.size * 0.5); // Ponto superior
                ctx.bezierCurveTo(
                    this.size * 0.7, -this.size * 1.2,
                    this.size * 1.3, this.size * 0.2,
                    0, this.size * 0.8
                );
                ctx.bezierCurveTo(
                    -this.size * 1.3, this.size * 0.2,
                    -this.size * 0.7, -this.size * 1.2,
                    0, -this.size * 0.5
                );
                ctx.closePath();
                ctx.fill();

                ctx.restore(); // Restaura o estado anterior do contexto
            }
        }

        // Inicializa um número de corações
        const numberOfHearts = 50;
        for (let i = 0; i < numberOfHearts; i++) {
            hearts.push(new Heart());
        }

        // Função de animação principal
        function animate() {
            // Limpa o canvas a cada quadro
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Atualiza e desenha cada coração
            hearts.forEach(heart => {
                heart.update();
                heart.draw();
            });

            // Solicita o próximo quadro de animação
            requestAnimationFrame(animate);
        }

        // Inicia a animação quando a janela é carregada
        window.onload = function() {
            animate();
        };
