-- Inserindo usuários de exemplo
INSERT INTO users (nome, email, senha) VALUES
('Afonsoo', 'afonsoo@email.com', 'senha123'),
('Afonsistem', 'Afonsistem@email.com', 'senha456'),
('Fonsoloro', 'Fonsoloro@gmail.com', 'senha789');

-- Inserindo categorias de exemplo
INSERT INTO categories (nome, user_id) VALUES
('Trabalho', 1),
('Estudos', 1),
('Pessoal', 1),
('Trabalho', 2),
('Lazer', 2),
('Saúde', 3);

-- Inserindo tarefas de exemplo
INSERT INTO tasks (titulo, descricao, status, data, user_id, categoria_id) VALUES
('Reunião de projeto', 'Preparar apresentação para reunião com cliente', 'pendente', CURRENT_DATE, 1, 1),
('Estudar Node.js', 'Revisar conceitos de middleware e rotas', 'em_andamento', CURRENT_DATE, 1, 2),
('Ir à academia', 'Treino de pernas', 'concluida', CURRENT_DATE, 1, 3),
('Relatório mensal', 'Finalizar relatório de vendas', 'pendente', CURRENT_DATE, 2, 4),
('Cinema', 'Assistir novo filme do Batman', 'pendente', CURRENT_DATE, 2, 5),
('Consulta médica', 'Check-up anual', 'pendente', CURRENT_DATE, 3, 6); 