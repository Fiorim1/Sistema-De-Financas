// Importação Inicial
// Conecta o arquivo de estilos a este componente. 
import '../components/stylesComponents/styleInsertion.css'
// Traz a ferramenta do React responsável por criar variáveis que, 
// quando alteradas, atualizam a tela automaticamente
import { useState } from 'react'
// Define o seu componente funcional (Nome da Função)
function Insertion() {



    // A "Memória" do Componente (States)
    // Guarda o texto digitado no campo de salário
    const [salario, setSalario] = useState('')
    // É um Array (lista) que guardará todas as despesas adicionadas.
    const [despesas, setDespesas] = useState([])
    // É um Objeto que serve de rascunho. Enquanto o usuário digita o nome e o valor da conta, 
    // os dados ficam guardados aqui antes de serem enviados para a lista oficial.
    const [novaDespesa, setNovaDespesa] = useState({ nome: '', valor: '' })



    // Ferramenta de Formatação
    /* Esta é uma função auxiliar pura (JavaScript padrão).
        - Ela recebe um valor numérico como entrada;
        - Utiliza a API Intl.NumberFormat para formatar esse valor como moeda brasileira (BRL);
        - Retorna o valor formatado como uma string.
    */
    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(Number(valor))
    }



    // Adicionar nova despesa
    const adicionarDespesa = (e) => {
        // Impedir a página de recarregar ao enviar o formulário
        e.preventDefault();
        // Validar se os campos estão preenchidos (! = não tiver)
        if (!novaDespesa.nome || !novaDespesa.valor) return;

        const item = {
            // Cria um ID baseado no tempo exato de criação do item
            id: Date.now(),
            // Nome da despesa
            nome: novaDespesa.nome,
            // Temos a segurança de converter o valor para número
            valor: Number(novaDespesa.valor)
        }

        // Limpar o formulário e adicionar a despesa na lista
        setDespesas([...despesas, item])
        // Limpar os campos do formulário onde  usuário digita
        setNovaDespesa({ nome: '', valor: '' })
    }



    // Remover despesa
    const removerDespesa = (id) => {
        // Filtra a lista, removendo o item com o ID correspondente
        setDespesas(despesas.filter(item => item.id !== id))
    }



    // Cálculos automáticos
    // Soma todas as despesas usando reduce (dentro do arrya Despesas)
    const totalDespesas = despesas.reduce((acc, curr) => acc + curr.valor, 0)
    // Calcula o saldo final subtraindo o total de despesas do salário
    const salarioNumerico = Number(salario)
    // Armazena o saldo final
    const saldoFinal = salarioNumerico - totalDespesas


    return (
        <div className="app-container">

            {/* Cabeçalho */}
            <header className="header">
                <h1>Inserção De Dados</h1>
            </header>

            <main className="main-card">

                {/* 1. Input do Salário */}
                <section className="input-group">
                    <label>Qual é o seu Salário Mensal?</label>
                    <div className="input-wrapper">
                        <span className="currency-symbol">R$</span>
                        <input
                        // Tipo numérico para aceitar apenas números
                            type="number"
                            // Vincula o valor do input à variável salário
                            value={salario}
                            // Atualiza a variável salário quando o usuário digita
                            onChange={(e) => setSalario(e.target.value)}
                            placeholder="0.00"
                            className="input-field"
                        />
                    </div>
                </section>

                {/* 2. Formulário para Adicionar Despesa */}
                <section className="form-nova-despesa">
                    <h3>Adicionar Despesa</h3>
                    <form onSubmit={adicionarDespesa} className="form-row">
                        <div className="campo-desc">
                            <input
                                type="text"
                                placeholder="Descrição (Ex: Luz)"
                                value={novaDespesa.nome}
                                // Atualiza o nome da nova despesa enquanto o usuário digita
                                onChange={(e) => setNovaDespesa({ ...novaDespesa, nome: e.target.value })}
                                className="input-field"
                                style={{ paddingLeft: '10px' }}
                            />
                        </div>
                        <div className="campo-valor">
                            <input
                                type="number"
                                placeholder="Valor"
                                value={novaDespesa.valor}
                                // Atualiza o valor da nova despesa enquanto o usuário digita
                                onChange={(e) => setNovaDespesa({ ...novaDespesa, valor: e.target.value })}
                                className="input-field"
                                style={{ paddingLeft: '10px' }}
                            />
                        </div>
                        <button type="submit" className="btn-adicionar">
                            +
                        </button>
                    </form>
                </section>

                {/* 3. Lista de Despesas e Totais */}
                <section>
                    <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Minhas Despesas</h3>

                    {despesas.length === 0 ? (
                        <p style={{ color: '#ccc', textAlign: 'center', margin: '20px 0' }}>Nenhuma despesa ainda.</p>
                    ) : (
                        <ul className="lista-despesas">
                            {despesas.map((item) => (
                                <li key={item.id} className="despesa-item">
                                    <span>{item.nome}</span>
                                    <div>
                                        <span className="valor-negativo">- {formatarMoeda(item.valor)}</span>
                                        <button onClick={() => removerDespesa(item.id)} className="btn-excluir">
                                            Excluir
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Cards de Resultado */}
                    <div className="resumo-container">
                        <div className="card-resumo card-total">
                            <span>Total Gastos</span>
                            <p className="valor-grande" style={{ color: '#dc2626' }}>
                                {formatarMoeda(totalDespesas)}
                            </p>
                        </div>

                        {/* A cor muda dependendo se sobrou dinheiro ou não */}
                        <div className={`card-resumo card-saldo ${saldoFinal >= 0 ? 'positivo' : 'negativo'}`}>
                            <span>Saldo Restante</span>
                            <p className="valor-grande">
                                {formatarMoeda(saldoFinal)}
                            </p>
                        </div>
                    </div>

                </section>
            </main>
        </div>
    )
}

export default Insertion
