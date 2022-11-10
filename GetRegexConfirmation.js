function GetRegexConfirmation() {
    return {
        "(^1$|[\\s]*l[oó]gico|respondido|quero|(ajudou[\\s]*si[mn]|pode se[r]?|consegu[ei]u|com[\\s]*certeza|certamente|[oó]bvi(o|amente)|o(qu|k)[ea]?[iy]?)|(clar(o|amente)|((pode)[\\s]*(seguir|continuar|prosseguir)))|(si[mn])|(confirm(o|a|ar|ado))|y[ae][ph]|([au]h[au]m)).*": "Sim",
        "(^2$|[\\s]*n[ãoô]|n[aãâ]o*|naum|nem|jamais|nunca|no[pt]?$|(de[\\s]*(forma|jeito)[\\s]*(algum[a]?|nenhum[a]?))).*": "Nao"
    }
}