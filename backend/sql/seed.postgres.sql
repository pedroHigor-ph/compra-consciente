-- Demonstration data from compra_consciente_schema.sql.
-- Run once, after schema.postgres.sql, on an empty database.
-- This file intentionally uses the original IDs and will not be idempotent.

BEGIN;

INSERT INTO categories (id, name, description) VALUES
    (1, 'Alimentos', 'Produtos alimentícios utilizados nos exemplos educativos.'),
    (2, 'Bebidas', 'Bebidas utilizadas nos exemplos de comparação.'),
    (3, 'Limpeza', 'Produtos de limpeza e manutenção doméstica.'),
    (4, 'Higiene', 'Produtos de higiene pessoal.'),
    (5, 'Papelaria', 'Materiais escolares e de escritório.'),
    (6, 'Outros', 'Produtos que não se enquadram nas demais categorias.');

INSERT INTO products (id, category_id, name, description, price, quantity, unit) VALUES
    (1, 1, 'Arroz Econômico', 'Produto fictício para demonstração do comparador.', 25.00, 5.000, 'kg'),
    (2, 1, 'Arroz Familiar', 'Produto fictício para demonstração do comparador.', 22.00, 3.000, 'kg'),
    (3, 1, 'Feijão Carioca', 'Produto fictício para demonstração do comparador.', 8.50, 1.000, 'kg'),
    (4, 1, 'Açúcar Refinado', 'Produto fictício para demonstração do comparador.', 5.90, 1.000, 'kg'),
    (5, 2, 'Leite Integral', 'Produto fictício para demonstração do comparador.', 5.20, 1.000, 'L'),
    (6, 2, 'Suco de Frutas', 'Produto fictício para demonstração do comparador.', 7.50, 1.500, 'L'),
    (7, 3, 'Detergente', 'Produto fictício para demonstração do comparador.', 2.80, 500.000, 'ml'),
    (8, 3, 'Amaciante', 'Produto fictício para demonstração do comparador.', 12.90, 2.000, 'L'),
    (9, 4, 'Sabonete', 'Produto fictício para demonstração do comparador.', 6.00, 3.000, 'un'),
    (10, 4, 'Shampoo', 'Produto fictício para demonstração do comparador.', 14.90, 400.000, 'ml'),
    (11, 5, 'Papel para impressão', 'Produto fictício para demonstração do comparador.', 29.90, 500.000, 'un'),
    (12, 5, 'Caderno', 'Produto fictício para demonstração do comparador.', 18.90, 1.000, 'un');

INSERT INTO educational_contents
    (id, title, slug, summary, content, category, published)
VALUES
    (1, 'Como comparar preços?', 'como-comparar-precos',
     'Aprenda a comparar produtos considerando preço e quantidade.',
     'Observar apenas o preço da embalagem pode dificultar a comparação entre produtos de tamanhos diferentes. Para realizar uma comparação mais justa, transforme os produtos para uma unidade de referência, como quilograma, litro ou unidade, e divida o preço pela quantidade normalizada.',
     'consumo', TRUE),
    (2, 'Preço por kg, litro e unidade', 'preco-por-kg-litro-e-unidade',
     'Entenda como funciona o preço proporcional dos produtos.',
     'Produtos vendidos em gramas podem ser convertidos para quilogramas, enquanto produtos vendidos em mililitros podem ser convertidos para litros. Depois da conversão, o preço é dividido pela quantidade. Produtos vendidos por unidade podem ser comparados pelo preço por unidade.',
     'educacao', TRUE),
    (3, 'Planejamento de compras', 'planejamento-de-compras',
     'Pequenas estratégias podem ajudar a evitar compras desnecessárias.',
     'Planejar compras envolve conhecer as necessidades reais da casa, elaborar uma lista e comparar alternativas antes de comprar. O planejamento pode ajudar a reduzir compras por impulso e desperdícios.',
     'planejamento', TRUE),
    (4, 'Consumo consciente', 'consumo-consciente',
     'Consumo consciente envolve considerar necessidade, custo e impactos das escolhas.',
     'Consumir de forma consciente não significa simplesmente comprar menos. Significa refletir sobre a necessidade do produto, comparar opções, avaliar a quantidade adquirida, evitar desperdícios e considerar a possibilidade de reutilização e maior vida útil dos itens.',
     'consumo', TRUE),
    (5, 'Como reduzir desperdícios?', 'como-reduzir-desperdicios',
     'Aprenda práticas simples para aproveitar melhor produtos e recursos.',
     'Planejar as quantidades compradas, armazenar corretamente os produtos, observar a validade e reutilizar materiais quando possível são algumas práticas que podem reduzir desperdícios e melhorar o uso dos recursos disponíveis.',
     'desperdicio', TRUE),
    (6, 'Consumo e sustentabilidade', 'consumo-e-sustentabilidade',
     'Entenda a relação entre decisões de consumo e sustentabilidade.',
     'Toda escolha de consumo envolve uso de recursos, transporte, produção e geração de resíduos. Avaliar a necessidade de uma compra, evitar desperdícios e prolongar a vida útil dos produtos são práticas que podem contribuir para padrões de consumo mais responsáveis.',
     'sustentabilidade', TRUE),
    (7, 'Embalagem maior sempre compensa?', 'embalagem-maior-sempre-compensa',
     'Tamanho maior não significa automaticamente menor custo proporcional.',
     'Uma embalagem maior pode ter um preço proporcional menor, mas isso deve ser verificado. Compare o preço por quilograma, litro ou unidade antes de decidir. Também considere se a quantidade maior será realmente consumida, pois comprar mais e desperdiçar parte do produto pode eliminar a vantagem econômica.',
     'consumo', TRUE);

ALTER TABLE categories ALTER COLUMN id RESTART WITH 7;
ALTER TABLE products ALTER COLUMN id RESTART WITH 13;
ALTER TABLE educational_contents ALTER COLUMN id RESTART WITH 8;

COMMIT;
