# 📄 PRD – Office Survivor

## 1. Visão Geral
**Office Survivor** é um jogo **roguelite bullet heaven** estilo *Vampire Survivors*, ambientado no **inferno de um escritório corporativo**.  
O jogador é um desenvolvedor preso em um loop de **reuniões infinitas, planilhas amaldiçoadas e chefes tóxicos**, lutando contra hordas de inimigos até conseguir sobreviver ao dia de trabalho e chegar em casa para descansar.  

- **Gênero**: Bullet Heaven / Roguelite / Humor Satírico  
- **Plataforma inicial**: Web (Phaser + TypeScript, com suporte desktop e mobile touch)  
- **Loop de jogo**: Sobreviver X minutos → enfrentar chefão → desbloquear upgrades → repetir runs  

---

## 2. Objetivos do Produto
- Entregar uma experiência **casual, viciante e humorística** para devs e pessoas do mundo corporativo.  
- Criar mecânicas simples de jogar (1 stick + upgrades) mas profundas (builds variadas).  
- Permitir jogabilidade curta (5–15 min) para sessões rápidas no navegador.  
- Expandir futuramente para **co-op casual online** (arena / pair-programming vs bosses).  

---

## 3. Core Gameplay Loop
1. Jogador começa como **um dev júnior** preso no escritório.  
2. Hordas infinitas de inimigos corporativos aparecem.  
3. Armas (ferramentas de dev) disparam automaticamente em cooldowns.  
4. Jogador coleta **XP (cafés, commits, post-its)** para subir de nível.  
5. Ao upar: escolher entre **3 upgrades aleatórios** (novas armas, buffs, passivos).  
6. Sobreviver até o **fim do expediente** (20 min padrão, 5–10 min em runs curtas).  
7. Batalha contra o **Boss do andar** (Gerente, PM, CTO, CEO).  
8. Ao morrer: retorna ao lobby, gasta moedas corporativas (VR Points, vale-refeição, etc.) em upgrades permanentes.  

---

## 4. Temática e Humor
- Estética: **pixel art simples**, vibe anos 90/retro (combina com Phaser).  
- Tom: **satírico** — piadas sobre reuniões, burocracia, processos absurdos.  
- Exemplo de inimigos:  
  - **Tickets do Jira** voadores.  
  - **Planilhas** vivas.  
  - **Reuniões fantasmas** que prendem o player.  
  - **Chefs** (Gerente de Projeto, RH, CFO, CEO) como bosses.  
- Armas = ferramentas de dev:  
  - “Café Expresso” → dispara projéteis rápidos.  
  - “Commit Massivo” → área de dano em volta.  
  - “Pull Request” → ricocheteia entre inimigos.  
  - “Script em Prod” → explosão caótica.  
- Passivos:  
  - “Headphones” = +velocidade.  
  - “Monitor Ultrawide” = mais alcance.  
  - “Vale Refeição” = regen de vida.  

---

## 5. Personagens / Progressão
- Personagem inicial: **Dev Júnior** (baixa stamina, arma simples).  
- Desbloqueáveis:  
  - **Dev Pleno** (arma secundária extra).  
  - **Dev Sênior** (mais XP ganho).  
  - **Tech Lead** (aura de buffs para aliados — útil no co-op).  
- Progressão meta:  
  - Moedas (VR Points) ganhas ao terminar runs.  
  - Árvore de upgrades permanentes (Ex: +5% HP base, +1 reroll por run, etc.).  

---

## 6. Modos de Jogo
- **Modo Solo (MVP)**: sobreviver ao expediente.  
- **Modo Arena Co-op (futuro)**: 2–4 devs online, enfrentando hordas juntos.  
- **Modo Endless (futuro)**: sobrevivência infinita com leaderboard global.  

---

## 7. Bosses
Cada boss representa um **andar do escritório**:
1. **Gerente de Projeto** → ataca jogando PowerPoints que explodem.  
2. **Product Manager** → invoca minions (usuários pedindo features).  
3. **CFO** → lança relatórios que drenam XP.  
4. **CEO** → transforma o mapa em caos (move paredes, corta caminho).  

---

## 8. Requisitos Técnicos
### Cliente
- **Phaser 3 + TypeScript**  
- **Primeira etapa (prototipagem)**:  
  - Representar jogador, inimigos, projéteis e pickups apenas com **formas geométricas simples (hitboxes: círculos, quadrados, retângulos)**.  
  - Validar **colisão, balanceamento e gameplay loop** antes de introduzir arte.  
- **Segunda etapa (arte)**:  
  - Substituir gradualmente hitboxes por sprites desenhados.  
  - Sprites estilizados em **pixel art** (personagens, inimigos, armas, partículas).  
- Controles: teclado (WASD/Setas) + mobile (joystick virtual).  

### Servidor
- **Single Player**: deploy estático (Vercel/Netlify).  
- **Leaderboard**: Express + tRPC + Supabase/SQLite.  
- **Multiplayer futuro**: Socket.IO ou Colyseus.  

### Integrações
- **tRPC** para tipos compartilhados (client-server).  
- **Supabase** para login, storage de leaderboard e analytics.  

---

## 9. KPIs de Sucesso
- Sessão média > 5 minutos.  
- Jogador voltar ao menos 2–3 vezes (loop viciante).  
- % runs completadas até o fim do expediente.  
- Leaderboard ativa (jogadores disputando score).  

---

## 10. Roadmap
### Fase 1 – MVP (Prototipagem com Hitboxes) – 4 a 6 semanas
- Core loop single-player.  
- Representar tudo com **formas geométricas (hitboxes)** → sem sprites no início.  
- 1 personagem jogável (Dev Júnior).  
- 5–6 armas, 5 passivos.  
- 3 inimigos básicos + 1 boss (todos como formas geométricas).  
- Leaderboard simples (top 10).  

### Fase 2 – Arte e Expansão
- Substituir gradualmente hitboxes por **sprites desenhados** dos personagens, inimigos e armas.  
- Novos mapas (outros andares do escritório).  
- Mais bosses e armas.  
- Progressão meta com upgrades permanentes.  

### Fase 3 – Multiplayer
- Co-op online.  
- Leaderboards globais.  
- Cosmetics (skins).  
